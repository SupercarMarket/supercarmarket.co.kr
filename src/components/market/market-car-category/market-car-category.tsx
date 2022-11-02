import Typography from 'components/common/typography';
import { CATEGORY } from 'constants/market';
import { useRouter } from 'next/router';
import React from 'react';

import * as S from './market-car-category.styled';

interface MarketCarKindProps {
  category: string;
}

const MarketCarKind = ({ category }: MarketCarKindProps) => {
  const { push } = useRouter();

  const selectCarKind = (value: string) => {
    push(`/market/${value}`);
  };

  return (
    <S.MarketCarKindList>
      {CATEGORY.map(({ option, value }) => (
        <S.MarketCarKindItem
          key={option}
          active={category === value}
          onClick={() => selectCarKind(value)}
        >
          <Typography>{option}</Typography>
        </S.MarketCarKindItem>
      ))}
    </S.MarketCarKindList>
  );
};

export default MarketCarKind;
