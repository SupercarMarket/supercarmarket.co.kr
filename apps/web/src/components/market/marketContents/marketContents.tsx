import { Container, Divider, Table, Wrapper } from '@supercarmarket/ui';
import useMarketDetail from 'hooks/queries/useMarketDetail';
import * as React from 'react';
import { css } from 'styled-components';

import MarketCard from '../marketCard';
import { MarketDetail } from '../marketDetail';

interface MarketContentsProps {
  id: string;
}

const MarketContents = (props: MarketContentsProps) => {
  const { id } = props;
  const { data, isFetching, isLoading } = useMarketDetail(id);

  if (isFetching || isLoading) return <div>로딩중?</div>;

  return (
    <Container>
      {data && (
        <>
          <MarketDetail data={data.data} />
          {data && (
            <Wrapper
              css={css`
                display: flex;
                flex-direction: column;
                gap: 13px;
                margin-bottom: 20px;
              `}
            >
              <Table tab="product" hidden={false} />
              {data.carList.map((m) => (
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
          )}
        </>
      )}
    </Container>
  );
};

export default MarketContents;
