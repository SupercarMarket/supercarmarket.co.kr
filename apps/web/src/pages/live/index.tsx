/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import {
  Button,
  Container,
  Title,
  Wrapper,
  Pagination,
  Typography,
} from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';
import { useRouter } from 'next/router';
import { authRequest } from 'http/core';

import { ModalContext } from 'feature/ModalProvider';
import Modal from 'components/live/modal';

interface Props {}

const Index = (props: Props) => {
  const [liveItemList, setLiveItemList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getBroadcastList().then((res: any) => {
      setLiveItemList(res.data);
    });
  }, []);

  return (
    <Container>
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
              return <LiveItem key={`LiveItem_${idx}`} data={data} />;
            })}
          </div>
        </div>
      </Wrapper>
      <Pagination pageSize={1} totalCount={1} totalPages={1} />
    </Container>
  );
};

Index.Layout = Layout;

export default Index;

interface LiveItem {
  id: number;
  isPrivate: boolean;
  tags: string[];
  thumbnailUrl: string;
  title: string;
  name: string;
}

const LiveItem = ({ data }: { data: LiveItem }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const clickItem = () => {
    if (data.isPrivate) {
      setIsOpen(false);
    } else router.push(`live/${data.id}`);
  };
  return (
    <div style={{ cursor: 'pointer', width: '25%' }} onClick={clickItem}>
      <div
        style={{
          width: '97%',
          height: '180px',
          backgroundColor: '#000000',
          margin: 'auto',
        }}
      >
        <img
          src={data.thumbnailUrl}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div style={{ margin: 'auto', width: '95%', marginTop: '20px' }}>
        <div
          style={{ fontWeight: '500', fontSize: '16px', lineHeight: '24px' }}
        >
          {data.name}
        </div>
        <div
          style={{
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '19.2px',
            marginTop: '10px',
          }}
        >
          {data.title}
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
          {data.tags.map((data: string) => {
            return `#${data}`;
          })}
        </div>
      </div>
      <Modal open={isOpen}>
        <div
          style={{
            width: '552px',
            height: '213px',
            borderRadius: '4px',
            padding: '24px',
            gap: '24px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Typography>{data.title}</Typography>
          <div></div>
        </div>
      </Modal>
    </div>
  );
};

const getBroadcastList = async () => {
  return await authRequest.get(`/live?page=1&pageSize=16`);
};

interface postCheckPasswordParams {
  seq: number;
  password: string;
}

const postCheckPassword = async (params: postCheckPasswordParams) => {
  return await authRequest.get(`/live/password`, { params });
};
