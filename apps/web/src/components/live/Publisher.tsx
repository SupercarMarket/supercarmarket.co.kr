import { Button } from '@supercarmarket/ui';
import { useRouter } from 'next/router';
import { OpenVidu, Publisher as Publishers, Session } from 'openvidu-browser';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SubscriberIcon from 'public/images/live/icons/SubscriberIcon.svg';
import VolumeIcon from 'public/images/live/icons/VolumeIcon.svg';
import CameraCloseIcon from 'public/images/live/icons/CameraCloseIcon.svg';
import { getOpenViduSessionToken } from 'http/server/live';
import { useDeleteBroadCastRoom } from 'http/server/live/mutaitons';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'http/server/live/keys';

interface Props {
  sessionId: string;
  data: Live.LiveRoomDto;
  setIsBroad: (broad: boolean) => void;
  isBroad: boolean;
}

function Publisher(props: Props) {
  const { isBroad, setIsBroad } = props;
  const newOV = new OpenVidu();
  newOV.enableProdMode();
  const { sessionId, data } = props;
  const [volume, setVolume] = useState<number>(80);
  const [isCamera, setIsCamera] = useState(true);
  const [session, setSession] = useState<Session>(newOV.initSession());
  const [publisher, setPublisher] = useState<Publishers>();

  const queryClient = useQueryClient();
  const deleteBroadCastRoomMutation = useDeleteBroadCastRoom();

  const router = useRouter();

  const volumeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.currentTarget.value));
  };

  const deleteBroadCastHandler = () => {
    deleteBroadCastRoomMutation.mutate(data.broadCastSeq, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: QUERY_KEYS.live() });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.id(String(data.broadCastSeq)),
        });
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

  const joinSession = () => {
    const connection = () => {
      getOpenViduSessionToken(sessionId).then((token: any) => {
        session
          .connect(token, {
            id: `test_${Math.random()}`,
          })
          .then(async () => {
            var devices = await newOV.getDevices();
            var videoDevices = devices.filter(
              (device) => device.kind === 'videoinput'
            );
            var video = document.getElementById(
              'Streaming'
            ) as HTMLVideoElement;
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
          <video autoPlay id="Streaming" />
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
    </div>
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
