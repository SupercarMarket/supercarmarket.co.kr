import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { SigninForm } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';
import { css } from 'styled-components';

const Signin: NextPageWithLayout = () => {
  return (
    <Container display="flex" justifyContent="center">
      <Wrapper
        css={css`
          width: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          padding: 53px 0;
          ${applyMediaQuery('mobile')} {
            gap: 24px;
            padding: 24px 0;
            width: 328px;
          }
        `}
      >
        <Title textAlign="center">로그인</Title>
        <SigninForm />
      </Wrapper>
    </Container>
  );
};

Signin.Layout = AuthLayout;

export default Signin;
