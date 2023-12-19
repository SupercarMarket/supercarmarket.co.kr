import {
  applyMediaQuery,
  Container,
  Divider,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import * as React from 'react';
import { css } from 'styled-components';

import MarketCard from '../marketCard';
import { MarketDetail } from '../marketDetail';
import { MarketDetailSkeleton } from 'components/fallback/loading';
import HeadSeo from 'components/common/headSeo';
import { useMarketPost } from 'http/server/market';
import { ModalProvider } from 'feature/ModalProvider';
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
                <MarketMine
                  id={id}
                  brdSeq={market.data.brdSeq as unknown as string}
                  price={market.data.price as unknown as number}
                />
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
                <Wrapper
                  css={css`
                    display: none;
                    ${applyMediaQuery('mobile')} {
                      display: block;
                      width: 100vw;
                      margin-left: calc(-50vw + 50%);
                    }
                  `}
                >
                  <Divider
                    width="100%"
                    height="8px"
                    color="#F7F7F8"
                    borderTop="1px solid #EAEAEC"
                  />
                </Wrapper>
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
