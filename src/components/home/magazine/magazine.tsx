import Container from 'components/common/container';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import { MagazineBanner } from 'components/magazine';
import MagazineCard from 'components/magazine/magazineList/magazineCard';
import useHome from 'hooks/queries/useHome';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { MagazineDto } from 'types/magazine';

import RouterButton from '../routerButton';

const Magazine = () => {
  const { data: magazine } = useHome<MagazineDto>('magazine');
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <MagazineBanner reverse button initialData={magazine} />
      <Wrapper
        css={css`
          margin: 40px 0;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 20px;

          ${applyMediaQuery('mobile')} {
            grid-template-columns: 1fr 1fr;
          }
        `}
      >
        {magazine &&
          magazine.data
            .slice(1, 4)
            .map((list) => (
              <MagazineCard key={list.id} type="small" {...list} />
            ))}
      </Wrapper>
      <RouterButton href="/magazine">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          슈마 매거진 더보기
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default Magazine;
