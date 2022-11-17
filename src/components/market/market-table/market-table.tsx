import Typography from 'components/common/typography';
import MarketRow from 'components/market/market-row';
import { MARKET_LIST_TABLE_HEAD } from 'constants/market';
import React from 'react';
import { MarketDto, WithBlurredImage } from 'types/market';

import * as S from './market-table.styled';

interface MarketTableProps {
  markets: WithBlurredImage<MarketDto>[];
}

const MarketTable = ({ markets }: MarketTableProps) => {
  return (
    <S.MarketTable>
      <S.MarketTHead>
        <S.MarketTableRow>
          {MARKET_LIST_TABLE_HEAD.map(({ title, width }) => (
            <S.MarketTableHead width={width} key={title}>
              <Typography fontSize="body-14">{title}</Typography>
            </S.MarketTableHead>
          ))}
        </S.MarketTableRow>
      </S.MarketTHead>
      <S.MarketTBody>
        {markets.map((m) => (
          <MarketRow key={m.id} {...m} />
        ))}
      </S.MarketTBody>
    </S.MarketTable>
  );
};

export default MarketTable;
