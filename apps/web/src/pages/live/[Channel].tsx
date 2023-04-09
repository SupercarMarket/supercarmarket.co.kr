/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Container } from '@supercarmarket/ui';
import { useRouter } from 'next/router';
import { authRequest } from 'http/core';
import Layout from 'components/layout';
import Publisher from 'components/live/Publisher';
import Subscriber from 'components/live/Subscriber';
import ChatInfo from 'components/live/ChatInfo';

import SubscriberIcon from 'public/images/live/icons/SubscriberIcon.svg';
import VolumeIcon from 'public/images/live/icons/VolumeIcon.svg';
import CameraCloseIcon from 'public/images/live/icons/CameraCloseIcon.svg';

interface Props {}

interface channelResType {
  broadCastSeq: number;
  isMine: boolean;
  sessionId: string;
  tags: string[];
  title: string;
  userCount: number;
  userName: string;
  userSeq: number;
}

const Channel = (props: Props) => {
  const [channelData, setChannelData] = useState<channelResType | null>();

  const router = useRouter();

  useEffect(() => {
    if (router.query.Channel)
      getDetailLiveInfo(router.query.Channel as string).then((data) => {
        setChannelData(data.data);
      });
    return () => {};
  }, [router.isReady, router.query.Channel]);

  return (
    <Container>
      <Layout>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          {channelData && (
            <>
              <LiveInfo data={channelData} />
              <ChatInfo data={channelData} />
            </>
          )}
        </div>
      </Layout>
    </Container>
  );
};

export default Channel;

const LiveInfo = ({ data }: { data: channelResType | null | undefined }) => {
  return (
    <div style={{ width: '880px' }}>
      {data ? (
        data.isMine ? (
          <Publisher sessionId={data.sessionId as string} data={data} />
        ) : (
          <Subscriber sessionId={data.sessionId as string} data={data} />
        )
      ) : (
        <div style={{ backgroundColor: '#000000', height: '495px' }} />
      )}
    </div>
  );
};

const getDetailLiveInfo = async (seq: string) => {
  const data = await authRequest.get(`live/${seq}`);
  return data;
};
