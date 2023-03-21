import { CommunityDto } from '@supercarmarket/types/community';
import { Alert, applyMediaQuery, Container, Wrapper } from '@supercarmarket/ui';
import { CardSkeleton } from 'components/fallback/loading';
import useHome from 'hooks/queries/useHome';
import * as React from 'react';
import { css } from 'styled-components';
import CommunityCard from '../communityCard';

const CommunityBestList = () => {
  const { data, isFetching, isLoading } = useHome<CommunityDto>('community');

  if (isFetching || isLoading)
    return <CardSkeleton size={4} variant="column" />;

  return (
    <Container display="flex">
      <Wrapper
        css={css`
          width: 100%;
          padding-bottom: 52.5px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 20px;
          ${applyMediaQuery('mobile')} {
            column-gap: 8px;
            row-gap: 16px;
            overflow-x: scroll;
            padding-bottom: 32px;
          }
        `}
      >
        {data && data.data.length > 0 ? (
          data.data.map((value) => (
            <CommunityCard key={value.id} variant="column" {...value} />
          ))
        ) : (
          <Alert severity="info" title="인기글이 존재하지 않습니다." />
        )}
      </Wrapper>
    </Container>
  );
};

export default CommunityBestList;
