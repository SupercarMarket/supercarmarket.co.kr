import { Container } from '@supercarmarket/ui';
import CommunityList from '../communityList';

interface CommunityPostingListProps {
  category?: '';
  subject?: '';
}

const CommunityPostingList = (props: CommunityPostingListProps) => {
  const { category, subject } = props;
  return (
    <Container>
      <CommunityList category={category} />
    </Container>
  );
};

export default CommunityPostingList;
