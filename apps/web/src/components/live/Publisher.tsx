import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';

interface Props {
  sessionId: string;
  volume: number;
}

function Publisher(props: Props) {
  const { sessionId } = props;

  const [initUserData, setInitUserData] = useState({
    sessionId: 'channelId',
    userName: 'userInfo.nickname',
  });

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    const connection = () => {
      getToken().then((token: any) => {
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
            const publich = newOV.initPublisher(undefined, {
              insertMode: 'APPEND',
              resolution: '880x495',
              frameRate: 10000000,
              videoSource: videoDevices[0].deviceId,
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
            });

            newSession.publish(publich);
            publich.stream.streamManager.addVideoElement(video);
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
            process.env.NEXT_PUBLIC_OPENVIDU_SECRET,
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
    video.volume = props.volume / 100;
  }, [props.volume]);

  if (!sessionId) {
    return <></>;
  }
  return (
    <div style={{ width: '880px' }}>
      <div style={{ height: '495px' }}>
        <video autoPlay id="Streaming" />
      </div>
    </div>
  );
}

export default Publisher;
