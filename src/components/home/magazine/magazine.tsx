import Container from 'components/common/container';
import { MagazineBanner } from 'components/magazine';
import MagazineCard from 'components/magazine/magazineList/magazineCard';
import { MagazineDto, WithBlurredImage } from 'types/magazine';

import * as Styled from './magazine.style';

interface MagazineProps {
  data: WithBlurredImage<MagazineDto>[];
}

const Magazine = ({ data }: MagazineProps) => {
  const [banner, ...lists] = data;
  return (
    <Container>
      <MagazineBanner data={banner} reverse button />
      <Styled.Wrapper>
        {lists.slice(0, 4).map((list) => (
          <MagazineCard key={list.id} type="small" {...list} />
        ))}
      </Styled.Wrapper>
    </Container>
  );
};

export default Magazine;
