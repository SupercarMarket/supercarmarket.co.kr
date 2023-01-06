import Container from 'components/common/container';
import Typography from 'components/common/typography';
import { MagazineBanner } from 'components/magazine';
import MagazineCard from 'components/magazine/magazineList/magazineCard';
import useHome from 'hooks/queries/useHome';
import { MagazineDto } from 'types/magazine';

import RouterButton from '../routerButton';
import * as Styled from './magazine.style';

const Magazine = () => {
  const { data: magazine } = useHome<MagazineDto>('magazine');
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <MagazineBanner reverse button />
      <Styled.Wrapper>
        {magazine &&
          magazine.data
            .slice(1, 4)
            .map((list) => (
              <MagazineCard key={list.id} type="small" {...list} />
            ))}
      </Styled.Wrapper>
      <RouterButton href="/magazine">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          슈마 매거진 더보기
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default Magazine;
