import Typography from 'components/common/typography';
import MarketRow from 'components/market/marketRow';
import { MARKET_LIST_TABLE_HEAD } from 'constants/market';
import React from 'react';
import { MarketDto, WithBlurredImage } from 'types/market';

import * as Styled from './marketTable.styled';

interface MarketTableProps {
  markets: WithBlurredImage<MarketDto>[];
  marginBottom: string;
}

const MarketTable = ({ markets, marginBottom = '80px' }: MarketTableProps) => {
  return (
    <Styled.MarketTable marginBottom={marginBottom}>
      <Styled.MarketTHead>
        <Styled.MarketTableRow>
          {MARKET_LIST_TABLE_HEAD.map(({ title, width }) => (
            <Styled.MarketTableHead width={width} key={title}>
              <Typography fontSize="body-14">{title}</Typography>
            </Styled.MarketTableHead>
          ))}
        </Styled.MarketTableRow>
      </Styled.MarketTHead>
      <Styled.MarketTBody>
        {markets.map((m) => (
          <MarketRow key={m.id} {...m} />
        ))}
      </Styled.MarketTBody>
    </Styled.MarketTable>
  );
};

export default MarketTable;
