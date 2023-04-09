import {
  Container,
  Wrapper,
  Divider,
  applyMediaQuery,
} from '@supercarmarket/ui';
import { css } from 'styled-components';
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
      <Wrapper
        css={css`
          display: none;
          ${applyMediaQuery('mobile')} {
            display: block;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            margin-bottom: 40px;
          }
        `}
      >
        <Divider
          width="100%"
          height="8px"
          color="#F7F7F8"
          borderTop="1px solid #EAEAEC"
        />
      </Wrapper>
      <PartnershipList category={category} pagination tab />
    </Container>
  );
};

export default PartnershipContents;
