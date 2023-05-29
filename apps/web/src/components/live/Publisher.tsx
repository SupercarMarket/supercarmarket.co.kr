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
import MicIcon from 'public/images/live/icons/MicIcon.svg';
import DisMicIcon from 'public/images/live/icons/DisMicIcon.svg';
import CameraCloseIcon from 'public/images/live/icons/CameraCloseIcon.svg';
import CameraOnIcon from 'public/images/live/icons/CameraOnIcon.svg';
import CameraChangeIcon from 'public/images/live/icons/CameraChangeIcon.svg';
import { getOpenViduSessionToken } from 'http/server/live';
import { useDeleteBroadCastRoom } from 'http/server/live/mutaitons';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'http/server/live/keys';
import { getSession } from 'next-auth/react';
import { css } from 'styled-components';
import { useMedia } from '@supercarmarket/hooks';
import Loader from './modal/Loader';

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
  const [isCamera, setIsCamera] = React.useState<boolean>(true);
  const [isMic, setIsMic] = React.useState<boolean>(true);
  const [session, setSession] = React.useState<Session>(newOV.initSession());
  const [publisher, setPublisher] = React.useState<Publishers>();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [mobileCamDevice, setMobileCamDevice] = React.useState<string>();

  const [mobileCamChange, setMobileCamChange] = React.useState<boolean>(false);

  const { isMobile } = useMedia({ deviceQuery });

  const queryClient = useQueryClient();
  const deleteBroadCastRoomMutation = useDeleteBroadCastRoom();

  newOV.enableProdMode();
  const router = useRouter();

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

  const micOnOffHandler = async () => {
    if (session && publisher) {
      if (isMic) {
        publisher.publishAudio(false);
        setIsMic(false);
      } else {
        publisher.publishAudio(true);
        setIsMic(true);
      }
    }
  };

  const mobileCamChangeHandler = async () => {
    const face = mobileCamDevice === 'environment' ? 'user' : 'environment';
    if (session && publisher) {
      const constraints = {
        audio: true,
        video: { facingMode: { exact: face } },
      };

      const devices = await navigator.mediaDevices.getUserMedia(constraints);
      setMobileCamDevice(face);
      await publisher.replaceTrack(devices.getVideoTracks()[0]);
    }
  };

  const joinSession = async () => {
    setIsLoading(true);

    const userSession = await getSession();
    getOpenViduSessionToken(sessionId).then((token: any) => {
      session
        .connect(token, {
          userId: `${userSession?.nickname}`,
        })
        .then(async () => {
          const constraints = {
            audio: undefined,
            video: isMobile
              ? { facingMode: { exact: 'user' } }
              : { width: 880, height: 495 },
          };
          const devices = await navigator.mediaDevices.getUserMedia(
            constraints
          );

          const video = document.getElementById(
            'Streaming'
          ) as HTMLVideoElement;
          const publich = newOV.initPublisher(undefined, {
            insertMode: 'APPEND',
            resolution: '880x495',

            frameRate: 70,
            videoSource: devices.getVideoTracks()[0],
            audioSource: undefined,
          });

          session.publish(publich);
          setPublisher(publich);
          setMobileCamDevice('user');
          setIsBroad(true);
          publich.stream.streamManager.addVideoElement(video);
          video.style.transform = 'rotate(0)';
          video.style.width = '100%';

          video.controls = true;
          setIsLoading(false);
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
          <div
            style={{
              marginTop: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
            onClick={micOnOffHandler}
          >
            {isMic ? <MicIcon /> : <DisMicIcon />}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              marginLeft: 'auto',
            }}
          >
            {isMobile && (
              <Button variant="Primary-Line" onClick={mobileCamChangeHandler}>
                <CameraChangeIcon />
              </Button>
            )}
            <Button variant="Primary-Line" onClick={cameraOnOffHandler}>
              {!isMobile && `카메라 ${isCamera ? '끄기' : '켜기'}`}
              {isCamera ? <CameraCloseIcon /> : <CameraOnIcon />}
            </Button>
            <Button
              variant="Primary"
              disabled={deleteBroadCastRoomMutation.isLoading}
              onClick={deleteBroadCastHandler}
            >
              {isMobile ? '종료' : '방송 종료하기'}
            </Button>
          </div>
        </div>
      </div>
      <Loader isOpen={isLoading} />
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
