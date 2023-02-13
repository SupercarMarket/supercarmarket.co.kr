import { Wrapper } from '@supercarmarket/ui';

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
