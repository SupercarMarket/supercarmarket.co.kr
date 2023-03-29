import axios from 'axios';
import Layout from 'components/layout/layout';
import { Container } from 'components/layout/layout.styled';
import { OpenVidu, Publisher, Session } from 'openvidu-browser';
import React, { useState } from 'react';

interface Props {}

function Publishers(props: Props) {
  const [ov, setOv] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();

  const [initUserData, setInitUserData] = useState({
    sessionId: 'channelId',
    userName: 'userInfo.nickname',
  });

  const [publisher, setPublisher] = useState<Publisher | null>(null);

  const {} = props;

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    setOv(newOV);
    setSession(newSession);

    const connection = () => {
      getToken().then((token: any) => {
        newSession
          .connect(token, { clientData: initUserData.userName })
          .then(async () => {
            newOV
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: '1280x720',
                frameRate: 100000000,
              })
              .then((mediaStream) => {
                var videoTrack = mediaStream.getVideoTracks()[0];
                var video = document.getElementById(
                  'Streaming'
                ) as HTMLVideoElement;
                video.srcObject = new MediaStream([videoTrack]);

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                ctx.filter = 'grayscale(100%)';

                video?.addEventListener('play', () => {
                  var loop = () => {
                    if (!video?.paused && !video?.ended) {
                      ctx.drawImage(video, 0, 0, 880, 485);
                      setTimeout(loop, 1);
                    }
                  };
                  loop();
                });
                video.play();

                var newPublisher = newOV.initPublisher(initUserData.userName, {
                  audioSource: undefined,
                  videoSource: videoTrack,
                  publishAudio: true,
                  publishVideo: true,
                  // resolution: '1280x720',
                  // frameRate: 10,
                  insertMode: 'APPEND',
                  mirror: true,
                });
                // 4-c publish
                newPublisher.once('accessAllowed', () => {
                  newSession.publish(newPublisher);
                  setPublisher(newPublisher);
                });
              });
          })
          .catch((error) => {
            console.warn(
              'There was an error connecting to the session:',
              error.code,
              error.message
            );
          });
      });
    };
    connection();
  };

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

export default Publishers;

const getToken = async () => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_OPENVIDU_API_URL}/openvidu/api/sessions`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_OPENVIDU_SECRET)}`,
      },
    }
  );
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
