import Wrapper from 'components/common/wrapper';
import React from 'react';

import * as Styled from './marketDetailIntroduction.styled';

interface MarketDetailIntroductionProps {
  introduction: string;
}

const MarketDetailIntroduction = ({
  introduction,
}: MarketDetailIntroductionProps) => {
  return (
    <Wrapper css={Styled.wrapper}>
      <Styled.Content>{introduction}</Styled.Content>
    </Wrapper>
  );
};

export default MarketDetailIntroduction;
