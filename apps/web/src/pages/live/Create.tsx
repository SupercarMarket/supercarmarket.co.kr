/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Container, Title, Wrapper } from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';
import { authRequest } from 'http/core';
import { useRouter } from 'next/router';

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

  const router = useRouter();

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

    const formData = new FormData();

    console.log(
      (
        (document.getElementById('thumbnail') as HTMLInputElement)
          .files as FileList
      )[0]
    );
    formData.append(
      'addBroadCastDto',
      new Blob([JSON.stringify(params)], { type: 'application/json' })
    );
    formData.append(
      'file',
      (
        (document.getElementById('thumbnail') as HTMLInputElement)
          .files as FileList
      )[0]
    );

    const data = await authRequest.post(`/live`, formData);

    console.log(data);
    router.push(`${data.data.bcSeq}`);
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
