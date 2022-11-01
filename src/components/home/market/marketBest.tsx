import { MarketCard } from 'components/common/card';
import Container from 'components/common/container';
import { MarketDto, WithBlurredImage } from 'types/market';

import { Wrapper } from './market.styled';

interface MarketProps {
  marketBest: WithBlurredImage<MarketDto>[];
}

const Market = ({ marketBest }: MarketProps) => {
  const marketBestList = marketBest.slice(0, 8);
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper>
        {marketBestList.map((post) => (
          <MarketCard key={post.id} {...post} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Market;
