/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';

import { Container, Title, Wrapper } from '@supercarmarket/ui';
import Layout from 'components/layout';
import { useRouter } from 'next/router';
import Publisher from 'components/live/Publisher';
import Subscriber from 'components/live/Subscriber';
import { authRequest } from 'http/core';

interface Props {}

const Channel = (props: Props) => {
  const [sessionId, setSessionId] = useState('');

  const [type, setType] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (router.query.Channel)
      getDetailLiveInfo(router.query.Channel as string).then((data) => {
        setSessionId(data.data.sessionId);
        if (data.data.isMine) {
          setType('publish');
        } else {
          setType('subscriber');
        }
      });
    return () => {};
  }, [router.isReady]);

  return (
    <Container>
      <Layout>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          {type === 'publish' ? (
            <Publisher sessionId={sessionId as string} />
          ) : type === 'subscriber' ? (
            <Subscriber sessionId={sessionId as string} />
          ) : (
            <></>
          )}
        </div>
      </Layout>
    </Container>
  );
};

export default Channel;

const getDetailLiveInfo = async (seq: string) => {
  const data = await authRequest.get(`live/${seq}`);
  console.log(data);
  return data;
};
