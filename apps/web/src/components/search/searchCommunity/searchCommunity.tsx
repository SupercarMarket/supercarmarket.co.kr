import type { CommunityDto } from '@supercarmarket/types/community';
import { Container, Wrapper } from '@supercarmarket/ui';

interface SearchAllProps {
  data: CommunityDto[];
}

const SearchCommunity = ({ data }: SearchAllProps) => {
  const {} = data;
  return (
    <Container>
      <Wrapper />
    </Container>
  );
};

export default SearchCommunity;
