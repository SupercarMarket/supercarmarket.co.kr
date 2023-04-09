/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Container } from '@supercarmarket/ui';
import { useRouter } from 'next/router';
import { authRequest } from 'http/core';
import Layout from 'components/layout';
import Publisher from 'components/live/Publisher';
import Subscriber from 'components/live/Subscriber';
import ChatInfo from 'components/live/ChatInfo';

interface Props {
  isSSR: boolean;
}

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
  const [isBroad, setIsBroad] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (props.isSSR) {
      router.replace('/live');
    } else if (router.query.Channel)
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
              <LiveInfo
                data={channelData}
                setIsBroad={setIsBroad}
                isBroad={isBroad}
              />
              <ChatInfo data={channelData} isBroad={isBroad} />
            </>
          )}
        </div>
      </Layout>
    </Container>
  );
};

export default Channel;

Channel.getInitialProps = async (context: any) => {
  const { req } = context;
  return { isSSR: !!req };
};

interface LiveInfo {
  data: channelResType | null | undefined;
  setIsBroad: (broad: boolean) => void;
  isBroad: boolean;
}
const LiveInfo = (props: LiveInfo) => {
  const { data, isBroad, setIsBroad } = props;
  return (
    <div style={{ width: '880px' }}>
      {data ? (
        data.isMine ? (
          <Publisher
            sessionId={data.sessionId as string}
            data={data}
            setIsBroad={setIsBroad}
            isBroad={isBroad}
          />
        ) : (
          <Subscriber
            sessionId={data.sessionId as string}
            data={data}
            setIsBroad={setIsBroad}
            isBroad={isBroad}
          />
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
