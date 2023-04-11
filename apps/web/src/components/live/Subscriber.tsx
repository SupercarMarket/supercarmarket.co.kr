import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OpenVidu, Session } from 'openvidu-browser';
import { Button } from '@supercarmarket/ui';
import SubscriberIcon from 'public/images/live/icons/SubscriberIcon.svg';
import VolumeIcon from 'public/images/live/icons/VolumeIcon.svg';
import { getOpenViduSessionToken } from 'http/server/live';

interface Props {
  sessionId: string;
  data: channelResType;
  setIsBroad: (broad: boolean) => void;
  isBroad: boolean;
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

function Subscriber(props: Props) {
  const { isBroad, setIsBroad } = props;
  const newOV = new OpenVidu();
  newOV.enableProdMode();
  const { sessionId, data } = props;
  const [volume, setVolume] = useState<number>(80);
  const [session, setSession] = useState<Session>(newOV.initSession());

  const router = useRouter();

  const volumeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.currentTarget.value));
  };

  const deleteBroadCastHandler = () => {
    session.disconnect();
    setIsBroad(false);
    setTimeout(() => {
      router.replace('/live');
    }, 100);
  };

  const joinSession = () => {
    var video = document.getElementById('Streaming') as HTMLVideoElement;
    const connection = () => {
      getOpenViduSessionToken(sessionId).then((token: any) => {
        session.on('streamCreated', async (event) => {
          session.subscribe(event.stream, undefined);
          event.stream.streamManager.addVideoElement(video);
        });

        session.connect(token, {
          id: `test_${Math.random()}`,
        });
      });
    };
    connection();
  };

  useEffect(() => {
    if (sessionId) joinSession();
    return () => {
      session.disconnect();
    };
  }, []);

  useEffect(() => {
    var video = document.getElementById('Streaming') as HTMLVideoElement;
    video.volume = volume / 100;
  }, [volume]);

  if (!sessionId) {
    return <></>;
  }
  return (
    <div>
      <div style={{ width: '880px' }}>
        <div style={{ backgroundColor: '#000000', height: '495px' }}>
          <video
            autoPlay
            id="Streaming"
            style={{ width: '100%', height: '100%' }}
            controls
          />
        </div>
      </div>
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
            <p style={subscriberStyle}>{data?.userCount || 0}</p>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <Button variant="Primary" onClick={deleteBroadCastHandler}>
              나가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscriber;

const publisherStyle = {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '150%',
};

const subscriberStyle = {
  marginLeft: '8px',
  fontSize: '16px',
  lineHeight: '120%',
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
