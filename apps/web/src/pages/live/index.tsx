import * as React from 'react';
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
import { authRequest } from 'http/core';
import { useBroadCast } from 'http/server/live/queries';
import { type NextPageWithLayout } from '@supercarmarket/types/base';

const Index: NextPageWithLayout = () => {
  const {
    data: broadCast,
    isLoading,
    isFetching,
  } = useBroadCast({
    page: 1,
    pageSize: 16,
  });

  const router = useRouter();

  if (isLoading || isFetching || !broadCast) return <div>loading..</div>;

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
        {broadCast && (
          <div style={{ marginTop: '20px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px 0',
                flex: 'auto',
              }}
            >
              {broadCast.list.map((data, idx) => {
                return <LiveItem key={`LiveItem_${idx}`} data={data} />;
              })}
            </div>
          </div>
        )}
      </Wrapper>
      <Pagination pageSize={1} totalCount={1} totalPages={1} />
    </Container>
  );
};

Index.Layout = Layout;

export default Index;

const LiveItem = ({ data }: { data: any }) => {
  const router = useRouter();
  const clickItem = () => {
    router.push(`live/${data.id}`);
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
    </div>
  );
};

const getBroadcastList = async () => {
  const data = await authRequest.get(`/live?page=1&pageSize=16`);
  return data;
};
