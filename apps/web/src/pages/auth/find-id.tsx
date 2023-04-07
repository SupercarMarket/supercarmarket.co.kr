import * as React from 'react';
import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { FindIdForm } from 'components/auth';
import { css } from 'styled-components';
import Layout from 'components/layout';

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
        <Title textAlign="center">아이디 찾기</Title>
        <FindIdForm />
      </Wrapper>
    </Container>
  );
};

FindPassword.Layout = Layout;

export default FindPassword;
