import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { PartnershipForm } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { css } from 'styled-components';
import { ModalProvider } from 'feature/modalContext';

const Partnership: NextPageWithLayout = () => {
  return (
    <Container display="flex" flexDirection="column" gap="40px">
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 40px;
          ${applyMediaQuery('mobile')} {
            padding: 0 16px;
          }
        `}
      >
        <Title>제휴업체 등록 문의</Title>
        <ModalProvider>
          <PartnershipForm />
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

Partnership.Layout = Layout;

export default Partnership;
