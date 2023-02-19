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
      <Styled.Content>{introduction.split('"\n"')}</Styled.Content>
    </Wrapper>
  );
};

export default MarketDetailIntroduction;
