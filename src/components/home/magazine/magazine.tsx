import Container from 'components/common/container';
import Typography from 'components/common/typography';
import { MagazineBanner } from 'components/magazine';
import MagazineCard from 'components/magazine/magazineList/magazineCard';
import { MagazineDto, WithBlurredImage } from 'types/magazine';

import RouterButton from '../routerButton';
import * as Styled from './magazine.style';

interface MagazineProps {
  data: WithBlurredImage<MagazineDto>[];
}

const Magazine = ({ data }: MagazineProps) => {
  const [banner, ...lists] = data;
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <MagazineBanner data={banner} reverse button />
      <Styled.Wrapper>
        {lists.slice(0, 4).map((list) => (
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
