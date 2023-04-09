import { Button } from '@supercarmarket/ui';
import axios from 'axios';
import { authRequest } from 'http/core';
import { useRouter } from 'next/router';
import { OpenVidu, Publisher as Publishers, Session } from 'openvidu-browser';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';

import SubscriberIcon from 'public/images/live/icons/SubscriberIcon.svg';
import VolumeIcon from 'public/images/live/icons/VolumeIcon.svg';
import CameraCloseIcon from 'public/images/live/icons/CameraCloseIcon.svg';

interface Props {
  sessionId: string;
  data: channelResType;
  setisBroad: (broad: boolean) => void;
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

function Publisher(props: Props) {
  const { isBroad, setisBroad } = props;
  const newOV = new OpenVidu();
  newOV.enableProdMode();
  const { sessionId, data } = props;
  const [volume, setVolume] = useState<number>(80);

  const [session, setSession] = useState<Session>(newOV.initSession());
  const [publisher, setPublisher] = useState<Publishers>();

  const router = useRouter();

  const volumeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.currentTarget.value));
  };

  const deleteBroadCastHandler = () => {
    deleteBroadcast(data.broadCastSeq);
    session.disconnect();
    router.replace('/live');
  };

  const cameraOnOffHandler = () => {
    if (session && publisher) {
      var video = document.getElementById('Streaming') as HTMLVideoElement;
      if (isBroad) {
        session.unpublish(publisher);
        setisBroad(false);
      } else {
        session.publish(publisher);
        setisBroad(true);
        publisher.stream.streamManager.addVideoElement(video);
        video.style.transform = 'rotate(0)';
      }
    }
  };

  const joinSession = () => {
    const connection = () => {
      getToken().then((token: any) => {
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
            setisBroad(true);
            publich.stream.streamManager.addVideoElement(video);
            video.style.transform = 'rotate(0)';
          });
      });
    };
    connection();
  };

  const getToken = async () => {
    const resData = await axios.post(
      `${process.env.NEXT_PUBLIC_OPENVIDU_API_URL}/openvidu/api/sessions/${sessionId}/connection`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            process.env.NEXT_PUBLIC_OPENVIDU_SECRET as string,
            'utf8'
          ).toString('base64')}`,
        },
      }
    );
    return resData.data.token;
  };

  useEffect(() => {
    if (sessionId) joinSession();
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
              카메라 {isBroad ? '끄기' : '켜기'}
              <CameraCloseIcon />
            </Button>
            <Button variant="Primary" onClick={deleteBroadCastHandler}>
              방송 종료하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publisher;

const deleteBroadcast = async (seq: number) => {
  const data = await authRequest.delete(`/live`, { data: { seq: seq } });
  return data;
};

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
