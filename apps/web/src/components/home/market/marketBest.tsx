import { Container, Wrapper } from '@supercarmarket/ui';
import type { MarketDto } from '@supercarmarket/types/market';
import MarketCard from 'components/market/marketCard';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { useHome } from 'utils/api/home';

const Market = () => {
  const { data: marketBest } = useHome<MarketDto[]>('best');

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          column-gap: 20px;
          row-gap: 40px;
          margin-bottom: 40px;
          ${applyMediaQuery('mobile')} {
            column-gap: 8px;
            row-gap: 16px;
            grid-template-columns: 1fr 1fr;
          }
        `}
      >
        {marketBest &&
          marketBest.data
            .slice(0, 8)
            .map((post) => <MarketCard key={post.id} {...post} />)}
      </Wrapper>
    </Container>
  );
};

export default Market;
