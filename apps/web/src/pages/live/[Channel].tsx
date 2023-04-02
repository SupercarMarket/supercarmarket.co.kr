/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  ChangeEvent,
} from 'react';
import { Button, Container, Title, Wrapper } from '@supercarmarket/ui';
import Layout from 'components/layout';
import { useRouter } from 'next/router';
import Publisher from 'components/live/Publisher';
import Subscriber from 'components/live/Subscriber';
import { authRequest } from 'http/core';
import SubscriberIcon from 'public/images/live/icons/SubscriberIcon.svg';
import VolumeIcon from 'public/images/live/icons/VolumeIcon.svg';

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
          <LiveInfo data={channelData} />
        </div>
      </Layout>
    </Container>
  );
};

export default Channel;

const LiveInfo = ({ data }: { data: channelResType | null | undefined }) => {
  const [volume, setVolume] = useState<number>(80);

  const router = useRouter();

  const volumeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.currentTarget.value));
  };

  const deleteBroadCastHandler = () => {
    data && data.isMine && deleteBroadcast(data.broadCastSeq);
    router.replace('/live');
  };

  return (
    <div style={{ width: '880px' }}>
      {data &&
        (data.isMine ? (
          <Publisher sessionId={data.sessionId as string} volume={volume} />
        ) : (
          <Subscriber sessionId={data.sessionId as string} volume={volume} />
        ))}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
          }}
        >
          <p style={publisherStyle}>{data?.userName}</p>
          <div style={{ color: '#725B30', display: 'flex' }}>
            <SubscriberIcon />
            <p style={subscriberStyle}>{data?.userCount}</p>
          </div>
        </div>
        <div>
          <p style={liveTitleStyle}>{data?.title}</p>
        </div>
        <div>
          <p style={hashtagStyle}>{data?.tags.map((data) => `#${data}`)}</p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              marginTop: '15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <VolumeIcon />
            <div>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={volumeChangeHandler}
              />
            </div>
          </div>
          <div>
            <Button variant="Primary" onClick={deleteBroadCastHandler}>
              나가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getDetailLiveInfo = async (seq: string) => {
  const data = await authRequest.get(`live/${seq}`);
  return data;
};

const deleteBroadcast = async (seq: number) => {
  const data = await authRequest.delete(`/live`, { data: { seq: seq } });
  return data;
};

const subscriberStyle = {
  marginLeft: '8px',
  fontSize: '16px',
  lineHeight: '120%',
};

const publisherStyle = {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '150%',
};

const liveTitleStyle = {
  marginTop: '8px',
  fontSize: '20px',
  fontWeight: '700',
  lineHeight: '120%',
};

const hashtagStyle = {
  color: '#725B30',
  fontSize: '14px',
  lineHeight: '150%',
};
