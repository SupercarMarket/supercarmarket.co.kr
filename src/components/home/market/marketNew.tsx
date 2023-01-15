import { MarketCard } from 'components/common/card';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import useHome from 'hooks/queries/useHome';
import { MarketDto } from 'types/market';

import RouterButton from '../routerButton';
import { Wrapper } from './market.styled';

const MarketNew = () => {
  const { data: marketNew } = useHome<MarketDto>('new');

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper>
        {marketNew &&
          marketNew.data
            .slice(0, 8)
            .map((post) => <MarketCard key={post.id} {...post} />)}
      </Wrapper>
      <RouterButton href="/market">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          최신매물 더보기
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default MarketNew;
