import Typography from 'components/common/typography';
import { CATEGORY } from 'constants/market';
import { useRouter } from 'next/router';
import React from 'react';

import * as Styled from './marketCarCategory.styled';

const MarketCarKind = () => {
  const { query, push } = useRouter();

  const selectCarKind = (value: string) => {
    push(`/market/${value}?category=${value}`, undefined, {
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
