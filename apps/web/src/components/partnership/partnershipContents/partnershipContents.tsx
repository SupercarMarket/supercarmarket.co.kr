import { Container } from '@supercarmarket/ui';
import PartnershipDetail from '../partnershipDetail';
import PartnershipList from '../partnershipList';

interface PartnershipContentsProps {
  id: string;
  category: string;
}

const PartnershipContents = (props: PartnershipContentsProps) => {
  const { id, category } = props;
  return (
    <Container width="100%">
      <PartnershipDetail id={id} />
      <PartnershipList category={category} />
    </Container>
  );
};

export default PartnershipContents;
