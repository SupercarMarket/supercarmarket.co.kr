import { Container } from '@supercarmarket/ui';
import axios from 'axios';
import Layout from 'components/layout/layout';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';

interface Props {
  sessionId: string;
  volume: number;
}

function Subscriber(props: Props) {
  const { sessionId } = props;

  const [initUserData, setInitUserData] = useState({
    sessionId: 'channelId',
    userName: 'userInfo.nickname12',
  });

  const [strimManager, setStrimManager] = useState<StreamManager>();

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    const connection = () => {
      getToken().then((token: any) => {
        newSession.connect(token);

        var video = document.getElementById('Streaming') as HTMLVideoElement;

        newSession.on('connectionCreated', (event) => {
          if (event.connection.stream) {
            newSession.subscribe(event.connection.stream, video);
            console.log(event.connection.stream.streamManager);
            event.connection.stream.streamManager.addVideoElement(video);
          }
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
        <video
          autoPlay
          id="Streaming"
          style={{ width: '100%', height: '100%' }}
          controls
        />
      </div>
    </div>
  );
}

export default Subscriber;
