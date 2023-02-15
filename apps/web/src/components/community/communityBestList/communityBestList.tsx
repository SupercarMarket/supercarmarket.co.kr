import { useUrlQuery } from '@supercarmarket/hooks';
import { Alert, Container, Wrapper } from '@supercarmarket/ui';
import { CardSkeleton } from 'components/fallback/loading';
import useCommunity from 'hooks/queries/useCommunity';
import * as React from 'react';
import { css } from 'styled-components';
import CommunityCard from '../communityCard';

const CommunityBestList = () => {
  const { category } = useUrlQuery();
  const { data, isFetching, isLoading } = useCommunity({
    category: category || 'report',
    page: 0,
    filter: 'popular',
    searchType: 'title',
    keyword: null,
  });

  if (isFetching || isLoading)
    return <CardSkeleton size={4} variant="column" />;

  return (
    <Container display="flex">
      <Wrapper
        css={css`
          width: 100%;
          padding-bottom: 52.5px;
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
