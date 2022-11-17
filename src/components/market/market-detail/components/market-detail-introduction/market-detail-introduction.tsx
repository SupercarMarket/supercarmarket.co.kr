import Container from 'components/common/container/container';
import Typography from 'components/common/typography';
import React from 'react';

import * as S from './market-detail-introduction.styled';

interface MarketDetailIntroductionProps {
  introduction: string;
}

const MarketDetailIntroduction = ({
  introduction,
}: MarketDetailIntroductionProps) => {
  return (
    <Container margin="0 0 80px 0">
      <Typography fontSize="header-24" fontWeight="bold">
        차량소개
      </Typography>
      <S.Introduction>
        <S.Content>{introduction}</S.Content>
      </S.Introduction>
    </Container>
  );
};

export default MarketDetailIntroduction;
