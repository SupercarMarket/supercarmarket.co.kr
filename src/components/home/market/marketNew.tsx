import { MarketCard } from 'components/common/card';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import { MarketDto, WithBlurredImage } from 'types/market';

import RouterButton from '../routerButton';
import { Wrapper } from './market.styled';

interface MarketProps {
  marketNew: WithBlurredImage<MarketDto>[];
}

const MarketNew = ({ marketNew }: MarketProps) => {
  const marketNewList = marketNew.slice(0, 8);
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper>
        {marketNewList.map((post) => (
          <MarketCard key={post.id} {...post} />
        ))}
      </Wrapper>
      <RouterButton href="/market">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          슈마 매거진 더보기
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default MarketNew;
