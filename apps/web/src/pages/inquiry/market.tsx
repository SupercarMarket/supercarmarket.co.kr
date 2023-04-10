import { Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { SaleForm } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { css } from 'styled-components';
import { ModalProvider } from 'feature/ModalProvider';

const Market: NextPageWithLayout = () => {
  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 40px;
        `}
      >
        <Title>판매차량 등록 문의</Title>
        <ModalProvider>
          <SaleForm />
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

Market.Layout = Layout;

export default Market;
