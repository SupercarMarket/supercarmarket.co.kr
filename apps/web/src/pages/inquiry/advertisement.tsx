import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { AdvertisementForm } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { css } from 'styled-components';

const Advertisement: NextPageWithLayout = () => {
  return (
    <Container>
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
        <Title>광고 문의</Title>
        <AdvertisementForm />
      </Wrapper>
    </Container>
  );
};

Advertisement.Layout = Layout;

export default Advertisement;
