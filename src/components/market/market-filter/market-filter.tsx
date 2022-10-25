import MarketSelectWrapper from 'components/market/market-select-wrapper';
import {
  FIRST_MARKET_FILTER,
  SECOND_MARKET_FILTER,
} from 'constants/market-filter';
import React from 'react';

import * as S from './market-filter.styled';

const MarkerFilter = () => {
  return (
    <S.MarketFilterContainer>
      <S.MarketFilterBox>
        {FIRST_MARKET_FILTER.map(
          ({ subject, dataName, dataSet, firstLabel, secondLabel }) => (
            <MarketSelectWrapper
              key={subject}
              subject={subject}
              dataName={dataName}
              firstLabel={firstLabel}
              secondLabel={secondLabel}
              dataSet={dataSet}
            />
          )
        )}
      </S.MarketFilterBox>
      <S.MarketFilterBox>
        {SECOND_MARKET_FILTER.map(
          ({ subject, dataName, dataSet, firstLabel, secondLabel }) => (
            <MarketSelectWrapper
              key={subject}
              subject={subject}
              dataName={dataName}
              firstLabel={firstLabel}
              secondLabel={secondLabel}
              dataSet={dataSet}
            />
          )
        )}
      </S.MarketFilterBox>
    </S.MarketFilterContainer>
  );
};

export default MarkerFilter;
