import Typography from 'components/common/typography';
import { CATEGORY } from 'constants/market';
import { useRouter } from 'next/router';
import React from 'react';
import { makeQuery } from 'utils/market/marketFilter';

import * as Styled from './marketCarCategory.styled';

const MarketCarKind = () => {
  const { query, push } = useRouter();

  const selectCarKind = (value: string) => {
    const queries = { ...(query as { [key: string]: string }) };
    queries.category = value;
    const url = makeQuery(queries);
    push(`/market/${value}?${url}`, undefined, {
      scroll: false,
    });
  };

  return (
    <Styled.MarketCarKindList>
      {CATEGORY.map(({ option, value }) => (
        <Styled.MarketCarKindItem
          key={option}
          active={query.category === value}
          onClick={() => selectCarKind(value)}
        >
          <Typography>{option}</Typography>
        </Styled.MarketCarKindItem>
      ))}
    </Styled.MarketCarKindList>
  );
};

export default MarketCarKind;
