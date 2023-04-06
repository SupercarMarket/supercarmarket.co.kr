import { Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { DealerForm } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { css } from 'styled-components';
import { ModalProvider } from 'feature/ModalProvider';

const Dealer: NextPageWithLayout = () => {
  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 40px;
        `}
      >
        <Title>딜러 등록 문의</Title>
        <ModalProvider>
          <DealerForm />
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

Dealer.Layout = Layout;

export default Dealer;
