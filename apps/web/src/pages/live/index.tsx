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
import { useRouter } from 'next/router';

interface Props {}

const Index = (props: Props) => {
  const [liveItemList, setLiveItemList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getBroadcastList().then((res) => {
      console.log(res.data);
      setLiveItemList(res.data.list);
    });
  }, []);

  return (
    <Container>
      <Layout>
        <Wrapper
          css={css`
            padding-bottom: 40px;
          `}
        >
          <div style={{ display: 'flex', marginTop: '40px' }}>
            <Title>라이브</Title>
            <Button
              variant="Line"
              style={{
                width: '145px',
                height: '44px',
                color: '#B79F7B',
                border: '1px solid #B79F7B',
              }}
              onClick={() => {
                router.push('/live/Create');
              }}
            >
              라이브 시작하기
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px 0',
                flex: 'auto',
              }}
            >
              {liveItemList?.map((data, idx) => {
                return <LiveItem key={`LiveItem_${idx}`} />;
              })}
            </div>
          </div>
        </Wrapper>
        <Pagination pageSize={1} totalCount={1} totalPages={1} />
      </Layout>
    </Container>
  );
};

export default Index;

const LiveItem = () => {
  return (
    <div style={{ cursor: 'pointer', width: '25%' }}>
      <div
        style={{
          width: '97%',
          height: '180px',
          backgroundColor: '#000000',
          margin: 'auto',
        }}
      >
        <img />
      </div>
      <div style={{ margin: 'auto', width: '95%', marginTop: '20px' }}>
        <div
          style={{ fontWeight: '500', fontSize: '16px', lineHeight: '24px' }}
        >
          딜러 닉네임
        </div>
        <div
          style={{
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '19.2px',
            marginTop: '10px',
          }}
        >
          오늘의 라이브 진행합니다
        </div>
        <div
          style={{
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '21px',
            color: '#B78F7B',
            marginTop: '10px',
          }}
        >
          #해시태그
        </div>
      </div>
    </div>
  );
};

const getBroadcastList = async () => {
  const login = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login`,
    {
      id: 'gltlvl12',
      password: 'Rlaehduq12#',
    }
  );
  const accessTocken = login.data.data.access_token;
  const refreshTocken = login.data.data.refresh_token;
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/live?page=1&pageSize=16`,
    {
      headers: {
        ACCESS_TOKEN: accessTocken,
        REFRESH_TOKEN: refreshTocken,
      },
    }
  );
  return data;
};
