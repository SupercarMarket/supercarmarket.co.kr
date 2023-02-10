import Container from 'components/common/container';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import MarketCard from 'components/market/marketCard';
import useHome from 'hooks/queries/useHome';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { MarketDto } from 'types/market';

import RouterButton from '../routerButton';

const MarketNew = () => {
  const { data: marketNew } = useHome<MarketDto>('new');

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
            grid-template-columns: 1fr 1fr;
          }
        `}
      >
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
