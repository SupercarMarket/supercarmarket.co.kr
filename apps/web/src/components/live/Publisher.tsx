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

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    const connection = () => {
      getToken().then((token: any) => {
        newSession
          .connect(token, { clientData: initUserData.userName })
          .then(async () => {
            var video = document.getElementById(
              'Streaming'
            ) as HTMLVideoElement;
            const publich = newOV.initPublisher(video, {
              insertMode: 'APPEND',
              resolution: '880x495',
              frameRate: 10000000,
              videoSource: undefined,
            });
            newSession.publish(publich);
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
