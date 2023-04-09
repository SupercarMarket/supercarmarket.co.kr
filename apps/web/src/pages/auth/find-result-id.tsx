import { Container, Title, Wrapper, applyMediaQuery } from '@supercarmarket/ui';
import { ResultId } from 'components/auth';
import Layout from 'components/layout/layout';
import { css } from 'styled-components';

const FindIdResult = () => {
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
        <ResultId />
      </Wrapper>
    </Container>
  );
};

FindIdResult.Layout = Layout;

export default FindIdResult;
