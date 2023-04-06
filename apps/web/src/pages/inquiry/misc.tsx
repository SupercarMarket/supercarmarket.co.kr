import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { MiscForm } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { css } from 'styled-components';
import { ModalProvider } from 'feature/ModalProvider';

const Misc: NextPageWithLayout = () => {
  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 40px;
          ${applyMediaQuery('mobile')} {
            padding: 0 23.5px;
          }
        `}
      >
        <Title>기타 문의</Title>
        <ModalProvider>
          <MiscForm />
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

Misc.Layout = Layout;

export default Misc;
