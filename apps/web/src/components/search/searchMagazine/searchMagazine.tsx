import type { MagazineDto } from '@supercarmarket/types/magazine';
import { Container, Wrapper } from '@supercarmarket/ui';

interface SearchAllProps {
  data: MagazineDto[];
}

const SearchMagazine = ({ data }: SearchAllProps) => {
  const {} = data;
  return (
    <Container>
      <Wrapper />
    </Container>
  );
};

export default SearchMagazine;
