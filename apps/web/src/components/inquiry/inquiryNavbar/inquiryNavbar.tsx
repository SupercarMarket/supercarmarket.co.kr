import * as React from 'react';
import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { InquiryLink } from '@supercarmarket/types/inquiry';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

import Tr1Icon from '../../../../public/images/icons/tr_1.svg';
import Tr2Icon from '../../../../public/images/icons/tr_2.svg';
import Tr3Icon from '../../../../public/images/icons/tr_3.svg';
import Tr4Icon from '../../../../public/images/icons/tr_4.svg';
import Tr5Icon from '../../../../public/images/icons/tr_5.svg';
import ModalContext from 'feature/modalContext';
import { Modal } from 'components/common/modal';

const getSvgIcon = (index: number) => {
  return {
    0: <Tr1Icon width="100%" height="100%" />,
    1: <Tr2Icon width="100%" height="100%" />,
    2: <Tr3Icon width="100%" height="100%" />,
    3: <Tr4Icon width="100%" height="100%" />,
    4: <Tr5Icon width="100%" height="100%" />,
  }[index];
};

const InquiryNavbar = ({
  title,
  description,
  link,
  index,
}: InquiryLink & {
  index: number;
}) => {
  const session = useSession();
  const { onOpen, onClose } = React.useContext(ModalContext);
  const { replace } = useRouter();

  React.useEffect(() => {
    if (session.status !== 'authenticated')
      onOpen(
        <Modal
          description="로그인 후 서비스 이용 가능합니다"
          clickText="로그인"
          background="rgba(30, 30, 32, 0.5)"
          onClick={() => {
            onClose();
            replace('/auth/signin');
          }}
          onCancel={() => {
            onClose();
            replace('/auth/signin');
          }}
        />
      );
  }, [onClose, onOpen, replace, session.status]);

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
        <Wrapper.Item
          css={css`
            width: 100px;
            height: 100px;
          `}
        >
          {getSvgIcon(index)}
        </Wrapper.Item>
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
