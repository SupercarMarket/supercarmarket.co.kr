import * as React from 'react';
import { useRouter } from 'next/router';
import { OpenVidu, Session, Subscriber } from 'openvidu-browser';
import {
  Button,
  Wrapper,
  applyMediaQuery,
  deviceQuery,
} from '@supercarmarket/ui';
import SubscriberIcon from 'public/images/live/icons/SubscriberIcon.svg';
import VolumeIcon from 'public/images/live/icons/VolumeIcon.svg';
import { getOpenViduSessionToken } from 'http/server/live';
import { getSession } from 'next-auth/react';
import { useMedia } from '@supercarmarket/hooks';
import { css } from 'styled-components';

interface Props {
  sessionId: string;
  data: Live.LiveRoomDto;
  setIsBroad: (broad: boolean) => void;
  isBroad: boolean;
  liveViewCount: number | undefined;
}

function Subscribers(props: Props) {
  const { isBroad, setIsBroad, sessionId, data, liveViewCount } = props;
  const newOV = new OpenVidu();
  const [volume, setVolume] = React.useState<number>(80);
  const [session, setSession] = React.useState<Session>(newOV.initSession());
  const [subscribe, setSubscribe] = React.useState<Subscriber>();

  const { isMobile } = useMedia({ deviceQuery });

  newOV.enableProdMode();
  const router = useRouter();

  const volumeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.currentTarget.value));
  };

  const deleteBroadCastHandler = async () => {
    if (subscribe) {
      await session.unsubscribe(subscribe);
      setTimeout(() => {
        router.replace('/live').then(router.reload);
      }, 100);
    }
  };

  const joinSession = async () => {
    const userSession = await getSession();
    var video = document.getElementById('Streaming') as HTMLVideoElement;
    getOpenViduSessionToken(sessionId).then((token: any) => {
      session.on('streamCreated', async (event) => {
        const newSub = session.subscribe(event.stream, undefined);
        setSubscribe(newSub);
        event.stream.streamManager.addVideoElement(video);
        video.style.width = '100%';
      });

      session.connect(token, {
        userId: `${userSession?.nickname}`,
      });
    });
  };

  React.useEffect(() => {
    if (!subscribe) joinSession();
  }, []);

  React.useEffect(() => {
    var video = document.getElementById('Streaming') as HTMLVideoElement;
    video.volume = volume / 100;
  }, [volume]);

  return (
    <Wrapper.Item>
      <Wrapper.Item
        css={css`
          width: 880px;
          ${applyMediaQuery('mobile')} {
            grid-template-columns: 1fr 1fr;
            column-gap: 8px;
            row-gap: 16px;
            width: 100%;
          }
        `}
      >
        <Wrapper.Item
          css={css`
            background-color: #000000;
            height: 495px;
            ${applyMediaQuery('mobile')} {
              grid-template-columns: 1fr 1fr;
              column-gap: 8px;
              row-gap: 16px;
              height: auto;
            }
          `}
        >
          <video
            autoPlay
            id="Streaming"
            style={{ width: '100%', height: '100%' }}
            controls
          />
        </Wrapper.Item>
      </Wrapper.Item>
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
            <p style={subscriberStyle}>{liveViewCount || 0}</p>
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
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          {!isMobile && (
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
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              marginLeft: 'auto',
            }}
          >
            <Button variant="Primary" onClick={deleteBroadCastHandler}>
              나가기
            </Button>
          </div>
        </div>
      </div>
    </Wrapper.Item>
  );
}

export default Subscribers;

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
