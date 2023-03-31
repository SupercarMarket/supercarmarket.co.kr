import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';

interface Props {
  sessionId: string;
}

function Publisher(props: Props) {
  const { sessionId } = props;

  const [initUserData, setInitUserData] = useState({
    sessionId: 'channelId',
    userName: 'userInfo.nickname',
  });

  const [session, setSession] = useState<any>();
  const [publicher, setPublicher] = useState<any>();

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    const connection = () => {
      getToken().then((token: any) => {
        console.log(token);
        newSession
          .connect(token, { clientData: initUserData.userName })
          .then(async () => {
            var devices = await newOV.getDevices();
            var videoDevices = devices.filter(
              (device) => device.kind === 'videoinput'
            );
            var video = document.getElementById(
              'Streaming'
            ) as HTMLVideoElement;
            const publich = newOV.initPublisher(video, {
              insertMode: 'APPEND',
              resolution: '880x495',
              frameRate: 10000000,
              videoSource: videoDevices[0].deviceId,
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
            });
            // setSession(newSession);
            // setPublicher(publich);

            newSession.publish(publich);

            newSession.on('streamCreated', (event) => {
              const subscriber = newSession.subscribe(event.stream, undefined);
              console.log(subscriber);
            });
          });
      });
    };
    connection();
  };

  const test = () => {
    session.publish(publicher);
  };

  const getToken = async () => {
    const resData = await axios.post(
      `${process.env.NEXT_PUBLIC_OPENVIDU_API_URL}/openvidu/api/sessions/${sessionId}/connection`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(
            process.env.NEXT_PUBLIC_OPENVIDU_SECRET
          )}`,
        },
      }
    );
    return resData.data.token;
  };

  useEffect(() => {
    if (sessionId) joinSession();
  }, []);

  if (!sessionId) {
    return <></>;
  }
  return (
    <div style={{ width: '880px' }}>
      <div id="Streaming" style={{ height: '495px' }} />
      <div>
        <p>딜러 닉네임1234</p>
        <p>오늘의 라이브 진행합니다! 들어와서 구경하고 가세요!</p>
      </div>
    </div>
  );
}

export default Publisher;
