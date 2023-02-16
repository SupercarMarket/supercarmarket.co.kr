import type { SearchAll as SearchAllType } from '@supercarmarket/types/search';
import { Container, Wrapper } from '@supercarmarket/ui';

interface SearchAllProps {
  data: SearchAllType;
}

const SearchAll = ({ data }: SearchAllProps) => {
  const {} = data;
  return (
    <Container>
      <Wrapper />
    </Container>
  );
};

export default SearchAll;
