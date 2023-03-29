import { Container } from '@supercarmarket/ui';
import axios from 'axios';
import Layout from 'components/layout/layout';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';

interface Props {}

function Subscriber(props: Props) {
  const {} = props;

  const [ov, setOv] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();

  const [initUserData, setInitUserData] = useState({
    sessionId: 'channelId',
    userName: 'userInfo.nickname',
  });

  const [subscribers, setSubscribers] = useState<StreamManager>();

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    setOv(newOV);
    setSession(newSession);

    const connection = () => {
      getToken().then((token: any) => {
        newSession.connect(token, { clientData: initUserData.userName });

        var video = document.getElementById('Streaming') as HTMLVideoElement;

        newSession.on('streamCreated', (event) => {
          const newSubscriber = newSession.subscribe(event.stream, video, {
            insertMode: 'APPEND',
          });
          setSubscribers(newSubscriber);
        });
      });
    };
    connection();
  };

  useEffect(() => {
    joinSession();
  }, []);

  return (
    <Container>
      <Layout>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <div style={{ width: '880px' }}>
            <div style={{ height: '485px' }}>
              <video id="Streaming" style={{ height: '100%', width: '100%' }} />
            </div>
            <div>
              <p>딜러 닉네임</p>
              <p>오늘의 라이브 진행합니다! 들어와서 구경하고 가세요!</p>
            </div>
          </div>
        </div>
      </Layout>
    </Container>
  );
}

export default Subscriber;

const getToken = async () => {
  const resData = await axios.post(
    `${process.env.NEXT_PUBLIC_OPENVIDU_API_URL}/openvidu/api/sessions/${data.data.id}/connection`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_OPENVIDU_SECRET)}`,
      },
    }
  );
  return resData.data.token;
};
