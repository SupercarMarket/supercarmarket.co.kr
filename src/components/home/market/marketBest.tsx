import { MarketCard } from 'components/common/card';
import Container from 'components/common/container';
import useHome from 'hooks/queries/useHome';
import { MarketDto } from 'types/market';

import { Wrapper } from './market.styled';

const Market = () => {
  const { data: marketBest } = useHome<MarketDto>('best');

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper>
        {marketBest &&
          marketBest.data
            .slice(0, 8)
            .map((post) => <MarketCard key={post.id} {...post} />)}
      </Wrapper>
    </Container>
  );
};

export default Market;
