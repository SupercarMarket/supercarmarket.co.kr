import {
  applyMediaQuery,
  Button,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import Avvvatars from 'avvvatars-react';
import AuthModal from 'components/common/modal';
import CounselingModal from 'components/common/modal/counselingModal';
import ModalContext from 'feature/modalContext';
import useMagazineCounseling from 'hooks/mutations/magazine/useMagazineCounseling';
import { useCallback, useContext } from 'react';
import { css } from 'styled-components';

interface MagazineDealerProps {
  postId: string;
}

const user = {
  id: 'qwjfkqnwfkjnqwkjfnqwkfnkqwnfk',
  nickName: 'blan19',
  email: 'blanzzxz@naver.com',
  address: '서울특별시 청와대',
  call: '01012341234',
  accessToken: '12kqwnflknqwlkfnr123kln',
  createAt: '',
  sub: '',
};

const MagazineDealer = ({ postId }: MagazineDealerProps) => {
  const { mutate } = useMagazineCounseling(postId);
  const { onOpen, onClose, onClick } = useContext(ModalContext);

  const handleCounseling = useCallback(() => {
    mutate();
  }, [mutate]);

  const onModal = useCallback(() => {
    if (user)
      onOpen(
        <CounselingModal
          user={user}
          handleCounseling={handleCounseling}
          onClose={onClose}
          onClick={onClick}
          onOpen={onOpen}
        />
      );
    else
      onOpen(
        <AuthModal
          onClose={onClose}
          onClick={onClick}
          onOpen={onOpen}
          description="로그인 후 상담 신청이 가능합니다"
        />
      );
  }, [handleCounseling, onClick, onClose, onOpen]);

  return (
    <Container
      border="1px solid #EAEAEC"
      borderRadius="4px"
      // padding="30px 40px"
    >
      <Wrapper
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 30px 40px;
          ${applyMediaQuery('mobile')} {
            flex-direction: column;
            justify-content: unset;
            gap: 18.5px;
            padding: 16px;
          }
        `}
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
              ${applyMediaQuery('mobile')} {
                & > div {
                  width: 40px !important;
                  height: 40px !important;
                }
                & > div > p {
                  font-size: 15px !important;
                }
              }
            `}
          >
            <Avvvatars value="금종선" size={80} />
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              display: flex;
              flex-direction: column;
              gap: 6px;
              ${applyMediaQuery('mobile')} {
                gap: 4px;
                & > h4 {
                  font-size: ${({ theme }) =>
                    theme.fontSize['header-16']} !important;
                }
                & > span {
                  font-size: ${({ theme }) =>
                    theme.fontSize['body-12']} !important;
                }
              }
            `}
          >
            <Typography
              as="h4"
              fontSize="header-24"
              fontWeight="bold"
              lineHeight="150%"
              color="greyScale-6"
              space
            >
              금기사 금종선
            </Typography>
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
              space
            >
              금기사 금종선입니다!
            </Typography>
          </Wrapper.Item>
        </Wrapper.Left>
        <Wrapper.Right
          css={css`
            display: flex;
            align-items: center;
            gap: 40px;
            ${applyMediaQuery('mobile')} {
              justify-content: space-between;
              & > p {
                font-size: ${({ theme }) =>
                  theme.fontSize['body-12']} !important;
              }
            }
          `}
        >
          <Typography
            as="p"
            fontSize="body-14"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-6"
            space
          >{`더 자세한 정보를 원하신다면\n언제든지 문의 주세요.`}</Typography>
          <Button variant="Primary" onClick={onModal}>
            상담 신청
          </Button>
        </Wrapper.Right>
      </Wrapper>
    </Container>
  );
};

export default MagazineDealer;
