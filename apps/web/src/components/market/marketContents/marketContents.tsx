import { Container, Divider, Table, Wrapper } from '@supercarmarket/ui';
import * as React from 'react';
import { css } from 'styled-components';

import MarketCard from '../marketCard';
import { MarketDetail } from '../marketDetail';
import { ModalProvider } from 'feature/modalContext';
import { MarketDetailSkeleton } from 'components/fallback/loading';
import HeadSeo from 'components/common/headSeo';
import { useMarketPost } from 'http/server/market';
import { useSession } from 'next-auth/react';
import { MarketLike, MarketMine } from '../marketDetail/components';

interface MarketContentsProps {
  id: string;
}

const MarketContents = (props: MarketContentsProps) => {
  const { id } = props;
  const session = useSession();
  const {
    data: market,
    isFetching,
    isLoading,
  } = useMarketPost(id, session.data?.accessToken, {
    enabled: session.status && session.status !== 'loading',
  });

  return (
    <ModalProvider>
      {market && (
        <>
          <HeadSeo
            title={market.data.carName}
            description={market.data.introduction}
            image={market.data.imgSrc[0] || undefined}
          />
          <Container>
            <>
              {isFetching || isLoading ? (
                <MarketDetailSkeleton />
              ) : (
                <MarketDetail data={market.data} id={id} />
              )}
              {market.data.isMine ? (
                <MarketMine id={id} brdSeq={market.data.brdSeq} />
              ) : (
                <MarketLike id={id} isLike={market.data.isLike} />
              )}
              <Wrapper
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 13px;
                  margin-bottom: 20px;
                `}
              >
                <Table tab="product" hidden={false} />
                {market.carList.map((m) => (
                  <React.Fragment key={m.id}>
                    <MarketCard variant="row" {...m} />
                    <Divider
                      width="100%"
                      height="1px"
                      color="#EAEAEC"
                      margin="0"
                    />
                  </React.Fragment>
                ))}
              </Wrapper>
            </>
          </Container>
        </>
      )}
    </ModalProvider>
  );
};

export default MarketContents;
