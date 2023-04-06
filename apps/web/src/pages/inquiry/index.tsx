import { Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { InquiryNavbar } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { css } from 'styled-components';
import Advertisement from 'components/common/advertisement';
import { links } from 'constants/link/inquiry';
import { ModalProvider } from 'feature/ModalProvider';

const Inquiry: NextPageWithLayout = () => {
  return (
    <Container>
      <Advertisement />
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 20px;
        `}
      >
        <Title>어떤 문의를 원하시나요?</Title>
        <ModalProvider>
          {links.map((list, index) => (
            <InquiryNavbar key={list.title} index={index} {...list} />
          ))}
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

Inquiry.Layout = Layout;

export default Inquiry;
