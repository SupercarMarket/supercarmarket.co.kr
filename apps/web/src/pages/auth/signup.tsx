import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { SignupForm } from 'components/auth';
import { ModalProvider } from 'feature/ModalProvider';
import { css } from 'styled-components';
import Layout from 'components/layout/layout';

const Signup: NextPageWithLayout = () => {
  return (
    <Container display="flex" justifyContent="center">
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          padding: 53px;
          ${applyMediaQuery('mobile')} {
            gap: 24px;
            padding: 24px;
            width: 328px;
          }
        `}
      >
        <Title textAlign="center">회원가입</Title>
        <ModalProvider>
          <SignupForm />
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

Signup.Layout = Layout;

export default Signup;
