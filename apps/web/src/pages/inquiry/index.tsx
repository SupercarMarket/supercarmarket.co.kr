import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { InquiryNavbar } from 'components/inquiry';
import Layout from 'components/layout/layout';
import inquiry from 'constants/inquiry';
import { css } from 'styled-components';

const Inquiry: NextPageWithLayout = () => {
  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 20px;
          ${applyMediaQuery('mobile')} {
            padding: 0 16px;
          }
        `}
      >
        <Title>어떤 문의를 원하시나요?</Title>
        {inquiry.links.map((list) => (
          <InquiryNavbar key={list.title} {...list} />
        ))}
      </Wrapper>
    </Container>
  );
};

Inquiry.Layout = Layout;

export default Inquiry;
