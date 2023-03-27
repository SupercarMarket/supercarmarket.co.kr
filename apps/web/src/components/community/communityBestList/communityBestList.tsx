import { CommunityDto } from '@supercarmarket/types/community';
import { Alert, applyMediaQuery, Container, Wrapper } from '@supercarmarket/ui';
import { CardSkeleton } from 'components/fallback/loading';
import * as React from 'react';
import { css } from 'styled-components';
import { useHome } from 'http/server/home';
import CommunityCard from '../communityCard';

const CommunityBestList = () => {
  const { data, isFetching, isLoading } = useHome<CommunityDto[]>('community');

  if (isFetching || isLoading)
    return <CardSkeleton size={4} variant="column" />;

  return (
    <Container display="flex">
      <Wrapper
        css={css`
          width: 100%;
          height: 311px;
          display: flex;
          align-items: center;
          justify-content: center;
          ${applyMediaQuery('mobile')} {
            height: 217px;
          }
        `}
      >
        {data && data.data.length > 0 ? (
          <Wrapper.Item
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 1fr;
              gap: 20px;
              ${applyMediaQuery('mobile')} {
                column-gap: 8px;
                row-gap: 16px;
                overflow-x: scroll;
              }
            `}
          >
            {data.data.map((value) => (
              <CommunityCard key={value.id} variant="column" {...value} />
            ))}
          </Wrapper.Item>
        ) : (
          <Wrapper.Item
            css={css`
              width: 100%;
              display: flex;
              align-items: center;
            `}
          >
            <Alert severity="info" title="인기글이 존재하지 않습니다." />
          </Wrapper.Item>
        )}
      </Wrapper>
    </Container>
  );
};

export default CommunityBestList;
