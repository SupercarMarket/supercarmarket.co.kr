/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Button,
  Container,
  Title,
  Wrapper,
  Pagination,
} from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';

interface Props {}

interface broadcastDataType {
  title: string;
  tags: string[];
  isPrivate: boolean;
  password?: string;
}

const Create = (props: Props) => {
  const [broadcastData, setBroadcastData] = useState<broadcastDataType>({
    title: '',
    tags: [''],
    isPrivate: true,
  });

  const broadcastStateChangeHandler = (
    target: string,
    value: string | string[] | boolean
  ) => {
    setBroadcastData((prevState) => {
      return {
        ...prevState,
        [target]: value,
      };
    });
  };

  const createBroadCastRoom = async () => {
    if (broadcastData.isPrivate && !broadcastData.password) {
      alert('비밀번호를 설정해주세요');
    }
    const sessionId = await getSessionId();
    console.log(sessionId);

    const params = {
      ...broadcastData,
      sessionId: sessionId,
    };

    const login = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login`,
      {
        id: 'gltlvl12',
        password: 'Rlaehduq12#',
      }
    );
    const accessTocken = login.data.data.access_token;
    const refreshTocken = login.data.data.refresh_token;

    const formData = new FormData();
    formData.append('addBroadCastDto', JSON.stringify(params));
    formData.append(
      'file',
      (
        (document.getElementById('thumbnail') as HTMLInputElement)
          .files as FileList
      )[0]
    );

    const data = await axios.post(
      'http://3.37.88.125:8080/supercar/v1/live',
      // `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/live`,
      formData,
      {
        headers: {
          ACCESS_TOKEN: accessTocken,
          REFRESH_TOKEN: refreshTocken,
        },
      }
    );

    console.log(data);
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Layout>
        <Wrapper
          css={css`
            padding-bottom: 40px;
          `}
        >
          <div style={{ display: 'flex', marginTop: '40px' }}>
            <Title>라이브 시작하기</Title>
          </div>
          <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div>제목 : </div>
              <div>
                <input
                  onChange={(event) => {
                    broadcastStateChangeHandler(
                      'title',
                      event.currentTarget.value
                    );
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div>태그 : </div>
              <div>
                <input
                  onChange={(event) => {
                    broadcastStateChangeHandler('tags', [
                      event.currentTarget.value,
                    ]);
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div>공개여부 : </div>
              <div>
                <input
                  type="radio"
                  id="public"
                  name="publicType"
                  onChange={(event) => {
                    broadcastStateChangeHandler('isPrivate', false);
                  }}
                />
                <label htmlFor="public">공개</label>
                <input
                  type="radio"
                  id="private"
                  name="publicType"
                  onChange={(event) => {
                    broadcastStateChangeHandler('title', true);
                  }}
                />
                <label htmlFor="private">비공개</label>
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div>썸네일 : </div>
              <div>
                <input type="file" id="thumbnail" />
              </div>
            </div>
          </div>

          <Button
            variant="Line"
            style={{
              width: '145px',
              height: '44px',
              color: '#B79F7B',
              border: '1px solid #B79F7B',
            }}
            onClick={createBroadCastRoom}
          >
            시작하기
          </Button>
        </Wrapper>
      </Layout>
    </Container>
  );
};

export default Create;

const getSessionId = async () => {
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
  return data.data.id;
};
