import { Container } from '@supercarmarket/ui';
import axios from 'axios';
import Layout from 'components/layout/layout';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';

interface Props {
  sessionId: string;
}

function Subscriber(props: Props) {
  const { sessionId } = props;

  const [initUserData, setInitUserData] = useState({
    sessionId: 'channelId',
    userName: 'userInfo.nickname1',
  });

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    const connection = () => {
      getToken().then((token: any) => {
        newSession.connect(token, { clientData: initUserData.userName });

        var video = document.getElementById('Streaming') as HTMLVideoElement;

        newSession.on('streamCreated', (event) => {
          newSession.subscribe(event.stream, video, {
            insertMode: 'APPEND',
          });
        });
      });
    };
    connection();
  };

  const getToken = async () => {
    const resData = await axios.get(
      `${process.env.NEXT_PUBLIC_OPENVIDU_API_URL}/openvidu/api/sessions/${sessionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(
            process.env.NEXT_PUBLIC_OPENVIDU_SECRET
          )}`,
        },
      }
    );
    return resData.data.connections.content[0].token;
  };

  useEffect(() => {
    if (sessionId) joinSession();
  }, []);

  if (!sessionId) {
    return <></>;
  }
  return (
    <div style={{ width: '880px' }}>
      <div id="Streaming" style={{ height: '485px' }}></div>
      <div>
        <p>딜러 닉네임</p>
        <p>오늘의 라이브 진행합니다! 들어와서 구경하고 가세요!</p>
      </div>
    </div>
  );
}

export default Subscriber;
