import Typography from 'components/common/typography';
import { CATEGORY } from 'constants/market';
import { useRouter } from 'next/router';
import React from 'react';

import * as S from './market-car-kind.styled';

interface MarketCarKindProps {
  kind: string;
}

const MarketCarKind = ({ kind }: MarketCarKindProps) => {
  const { push } = useRouter();

  const selectCarKind = (value: string) => {
    push(`/market/${value}`);
  };

  return (
    <S.MarketCarKindList>
      {CATEGORY.map(({ option, value }) => (
        <S.MarketCarKindItem
          key={option}
          active={kind === value}
          onClick={() => selectCarKind(value)}
        >
          <Typography>{option}</Typography>
        </S.MarketCarKindItem>
      ))}
    </S.MarketCarKindList>
  );
};

export default MarketCarKind;
