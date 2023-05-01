import {
  Button,
  Wrapper,
  applyMediaQuery,
  deviceQuery,
} from '@supercarmarket/ui';
import { useRouter } from 'next/router';
import { OpenVidu, Publisher as Publishers, Session } from 'openvidu-browser';
import * as React from 'react';
import SubscriberIcon from 'public/images/live/icons/SubscriberIcon.svg';
import VolumeIcon from 'public/images/live/icons/VolumeIcon.svg';
import CameraCloseIcon from 'public/images/live/icons/CameraCloseIcon.svg';
import { getOpenViduSessionToken } from 'http/server/live';
import { useDeleteBroadCastRoom } from 'http/server/live/mutaitons';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'http/server/live/keys';
import { getSession } from 'next-auth/react';
import { css } from 'styled-components';
import { useMedia } from '@supercarmarket/hooks';

interface Props {
  sessionId: string;
  data: Live.LiveRoomDto;
  setIsBroad: (broad: boolean) => void;
  isBroad: boolean;
  liveViewCount: number | undefined;
}

function Publisher(props: Props) {
  const { isBroad, setIsBroad, sessionId, data } = props;
  const newOV = new OpenVidu();
  const [volume, setVolume] = React.useState<number>(80);
  const [isCamera, setIsCamera] = React.useState(true);
  const [session, setSession] = React.useState<Session>(newOV.initSession());
  const [publisher, setPublisher] = React.useState<Publishers>();

  const { isMobile } = useMedia({ deviceQuery });

  const queryClient = useQueryClient();
  const deleteBroadCastRoomMutation = useDeleteBroadCastRoom();

  newOV.enableProdMode();
  const router = useRouter();

  const volumeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.currentTarget.value));
  };

  const deleteBroadCastHandler = () => {
    deleteBroadCastRoomMutation.mutate(data.broadCastSeq, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: QUERY_KEYS.live() });
        session.disconnect();
        router.replace('/live');
      },
    });
  };

  const cameraOnOffHandler = async () => {
    if (session && publisher) {
      if (isCamera) {
        publisher.publishVideo(false);
        setIsCamera(false);
      } else {
        publisher.publishVideo(true);
        setIsCamera(true);
      }
    }
  };

  const joinSession = async () => {
    const userSession = await getSession();
    getOpenViduSessionToken(sessionId).then((token: any) => {
      session
        .connect(token, {
          userId: `${userSession?.nickname}`,
        })
        .then(async () => {
          var devices = await newOV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );
          var video = document.getElementById('Streaming') as HTMLVideoElement;
          const publich = newOV.initPublisher(undefined, {
            insertMode: 'APPEND',
            resolution: '880x495',
            frameRate: 10000000,
            videoSource: videoDevices[0].deviceId,
          });

          session.publish(publich);
          setPublisher(publich);
          setIsBroad(true);
          publich.stream.streamManager.addVideoElement(video);
          video.style.transform = 'rotate(0)';
          video.style.width = '100%';
        });
    });
  };

  React.useEffect(() => {
    if (publisher === undefined) {
      joinSession();
    }
    return () => {
      session.disconnect();
    };
  }, []);

  React.useEffect(() => {
    var video = document.getElementById('Streaming') as HTMLVideoElement;
    video.volume = volume / 100;
  }, [volume]);

  if (!sessionId) {
    return <></>;
  }
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
          <video autoPlay id="Streaming" />
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
            <p style={subscriberStyle}>{props.liveViewCount || 0}</p>
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
            <Button variant="Primary-Line" onClick={cameraOnOffHandler}>
              카메라 {isCamera ? '끄기' : '켜기'}
              <CameraCloseIcon />
            </Button>
            <Button
              variant="Primary"
              type="button"
              disabled={deleteBroadCastRoomMutation.isLoading}
              onClick={deleteBroadCastHandler}
            >
              방송 종료하기
            </Button>
          </div>
        </div>
      </div>
    </Wrapper.Item>
  );
}

export default Publisher;

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
