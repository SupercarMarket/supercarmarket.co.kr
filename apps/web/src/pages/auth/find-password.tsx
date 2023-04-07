import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { FindPasswordForm } from 'components/auth';
import * as React from 'react';
import { ModalProvider } from 'feature/ModalProvider';
import { css } from 'styled-components';
import Layout from 'components/layout/layout';

const FindPassword: NextPageWithLayout = () => {
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
        <Title textAlign="center">비밀번호 찾기</Title>
        <ModalProvider>
          <FindPasswordForm />
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

FindPassword.Layout = Layout;

export default FindPassword;
