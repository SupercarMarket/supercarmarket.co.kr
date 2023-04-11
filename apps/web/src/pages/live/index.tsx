import * as React from 'react';
import {
  Button,
  Container,
  Title,
  Wrapper,
  Pagination,
  applyMediaQuery,
} from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';
import { useBroadCast } from 'http/server/live/queries';
import { type NextPageWithLayout } from '@supercarmarket/types/base';
import Link from 'next/link';

const Index: NextPageWithLayout = () => {
  const {
    data: broadCast,
    isLoading,
    isFetching,
  } = useBroadCast({
    page: 1,
    pageSize: 16,
  });

  if (isLoading || isFetching || !broadCast) return <div>loading..</div>;

  return (
    <Container>
      <Wrapper
        css={css`
          padding-bottom: 40px;
        `}
      >
        <Wrapper.Item
          css={css`
            display: flex;
          `}
        >
          <Title>라이브</Title>
          <Link href="/live/Create">
            <Button variant="Primary-Line" type="button">
              라이브 시작하기
            </Button>
          </Link>
        </Wrapper.Item>
        {broadCast && (
          <Wrapper.Item
            css={css`
              margin-top: 20px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 1fr;
              column-gap: 20px;
              row-gap: 40px;
              ${applyMediaQuery('mobile')} {
                grid-template-columns: 1fr 1fr;
                column-gap: 8px;
                row-gap: 16px;
              }
            `}
          >
            {broadCast.data.map((data, idx) => {
              return <LiveItem key={`LiveItem_${idx}`} data={data} />;
            })}
          </Wrapper.Item>
        )}
      </Wrapper>
      <Pagination pageSize={1} totalCount={1} totalPages={1} />
    </Container>
  );
};

Index.Layout = Layout;

export default Index;

const LiveItem = ({ data }: { data: any }) => {
  return (
    <Link href={`/live/${data.id}`}>
      <Container>
        <div
          style={{
            width: '100%',
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
      </Container>
    </Link>
  );
};
