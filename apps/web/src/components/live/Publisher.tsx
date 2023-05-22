import {
  Button,
  Wrapper,
  applyMediaQuery,
  deviceQuery,
} from '@supercarmarket/ui';
import { useRouter } from 'next/router';
import {
  Device,
  OpenVidu,
  Publisher as Publishers,
  Session,
} from 'openvidu-browser';
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
  const [mobileCamChange, setMobileCamChange] = React.useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = React.useState<string>();

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
    if (session && publisher) {
      const devices = await newOV.getDevices();

      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideo
        );
        if (newVideoDevice.length > 0) {
          const newPublisher = await newOV.initPublisher(undefined, {
            insertMode: 'APPEND',
            resolution: '880x495',
            frameRate: 60,
            videoSource: newVideoDevice[0].deviceId,
            audioSource: undefined,
            publishAudio: true,
            publishVideo: true,
          });
          // const mediaStream = await newOV.getUserMedia({
          //   audioSource: false,
          //   videoSource: videoDevices[1].deviceId,
          //   resolution: '1280x720',
          //   frameRate: 60,
          // });
          console.log(101);
          // mediaStream.getVideoTracks().map((d) => console.log(d.label));
          await session.unpublish(publisher).then(() => {
            setPublisher(newPublisher);
            session.publish(newPublisher);
          });
          // if (mobileCamChange) {
          //   const myTrack = mediaStream.getVideoTracks()[0];
          //   publisher.replaceTrack(myTrack);
          setMobileCamChange(false);
          // console.log(true);
          // } else {
          //   const myTrack = mediaStream.getVideoTracks()[1];
          //   publisher.replaceTrack(myTrack);
          //   setMobileCamChange(true);
          //   console.log(false);
        }
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
          // const devices = await newOV.getUserMedia({
          //   audioSource: false,
          //   videoSource: undefined,
          //   resolution: '1280x720',
          //   frameRate: 60,
          // });
          const devices = await newOV.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );
          // const videoDevices = devices.getVideoTracks()[0];
          // setCurrentVideo(videoDevices.id);

          // const mic = devices.getAudioTracks()[0];
          const video = document.getElementById(
            'Streaming'
          ) as HTMLVideoElement;
          const publich = newOV.initPublisher(undefined, {
            insertMode: 'APPEND',
            resolution: '880x495',
            frameRate: 60,
            videoSource: isMobile
              ? videoDevices[1].deviceId
              : videoDevices[0].deviceId,
            audioSource: undefined,
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
