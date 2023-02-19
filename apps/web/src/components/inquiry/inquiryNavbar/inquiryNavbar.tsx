import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { InquiryLink } from '@supercarmarket/types/inquiry';
import Link from 'next/link';

import { css } from 'styled-components';

const InquiryNavbar = ({ title, description, link }: InquiryLink) => {
  return (
    <Container
      display="flex"
      padding="34px 40px"
      background="#F7F7F8"
      borderRadius="4px"
    >
      <Wrapper.Left
        css={css`
          display: flex;
          align-items: center;
          gap: 40px;
        `}
      >
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50px',
            background: '#D9D9D9',
          }}
        />
        <Wrapper.Item
          css={css`
            position: relative;
          `}
        >
          <Typography
            as="b"
            fontSize="header-24"
            fontWeight="bold"
            lineHeight="120%"
            color="greyScale-6"
          >
            {title}
          </Typography>
          {description && (
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
              style={{
                position: 'absolute',
                width: '100%',
                whiteSpace: 'nowrap',
                left: 0,
                bottom: '-24px',
              }}
            >
              {description}
            </Typography>
          )}
        </Wrapper.Item>
      </Wrapper.Left>
      <Wrapper.Right
        css={css`
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        `}
      >
        <Link href={link} shallow>
          <Button variant="Black">문의하기</Button>
        </Link>
      </Wrapper.Right>
    </Container>
  );
};

export default InquiryNavbar;
