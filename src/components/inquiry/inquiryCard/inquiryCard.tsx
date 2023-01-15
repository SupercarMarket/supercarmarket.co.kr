import Button from 'components/common/button';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import Link from 'next/link';
import type { InquiryLink } from 'types/inquiry';

import * as style from './inquiry.styled';

const InquiryCard = ({ title, description, link }: InquiryLink) => {
  return (
    <Container
      display="flex"
      padding="34px 40px"
      background="#F7F7F8"
      borderRadius="4px"
    >
      <Wrapper.Left css={style.left}>
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50px',
            background: '#D9D9D9',
          }}
        />
        <Wrapper.Item css={style.leftItem}>
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
      <Wrapper.Right css={style.right}>
        <Link href={link} shallow>
          <Button variant="Black">문의하기</Button>
        </Link>
      </Wrapper.Right>
    </Container>
  );
};

export default InquiryCard;
