import Typography from 'components/common/typography';
import { CATEGORY } from 'constants/market';
import { useRouter } from 'next/router';
import React from 'react';

import * as Styled from './marketCarCategory.styled';

interface MarketCarKindProps {
  category: string;
}

const MarketCarKind = ({ category }: MarketCarKindProps) => {
  const { push } = useRouter();

  const selectCarKind = (value: string) => {
    push(`/market/${value}`);
  };

  return (
    <Styled.MarketCarKindList>
      {CATEGORY.map(({ option, value }) => (
        <Styled.MarketCarKindItem
          key={option}
          active={category === value}
          onClick={() => selectCarKind(value)}
        >
          <Typography>{option}</Typography>
        </Styled.MarketCarKindItem>
      ))}
    </Styled.MarketCarKindList>
  );
};

export default MarketCarKind;
