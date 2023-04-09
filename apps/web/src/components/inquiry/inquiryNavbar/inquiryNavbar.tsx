import * as React from 'react';
import {
  applyMediaQuery,
  Button,
  Container,
  deviceQuery,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

import Tr1Icon from '../../../../public/images/icons/tr_1.svg';
import Tr2Icon from '../../../../public/images/icons/tr_2.svg';
import Tr3Icon from '../../../../public/images/icons/tr_3.svg';
import Tr4Icon from '../../../../public/images/icons/tr_4.svg';
import Tr5Icon from '../../../../public/images/icons/tr_5.svg';
import { Modal } from 'components/common/modal';
import { useMedia } from '@supercarmarket/hooks';
import { type Links } from 'constants/link';
import { ModalContext } from 'feature/ModalProvider';

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
  href,
  description,
  index,
}: (Links & { description?: string }) & {
  index: number;
}) => {
  const session = useSession();
  const { isMobile } = useMedia({ deviceQuery });
  const { onOpen, onClose } = React.useContext(ModalContext);
  const { replace, push } = useRouter();

  React.useEffect(() => {
    if (session.status !== 'loading' && session.status !== 'authenticated')
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
      padding={isMobile ? '24px' : '34px 40px'}
      background="#F7F7F8"
      borderRadius="4px"
      handleClick={isMobile ? () => push(href as string) : undefined}
    >
      <Wrapper.Left
        css={css`
          display: flex;
          align-items: center;
          gap: 40px;
          ${applyMediaQuery('mobile')} {
            gap: 16px;
          }
        `}
      >
        <Wrapper.Item
          css={css`
            width: 100px;
            height: 100px;
            ${applyMediaQuery('mobile')} {
              width: 48px;
              height: 48px;
            }
          `}
        >
          {getSvgIcon(index)}
        </Wrapper.Item>
        <Wrapper.Item
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 4px;
          `}
        >
          <Typography
            as="b"
            fontSize={isMobile ? 'header-20' : 'header-24'}
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
          ${applyMediaQuery('mobile')} {
            display: none;
          }
        `}
      >
        <Link href={href} shallow>
          <Button variant="Black">문의하기</Button>
        </Link>
      </Wrapper.Right>
    </Container>
  );
};

export default InquiryNavbar;
