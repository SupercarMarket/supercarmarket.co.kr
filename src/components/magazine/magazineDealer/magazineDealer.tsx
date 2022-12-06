import Avvvatars from 'avvvatars-react';
import Button from 'components/common/button';
import Container from 'components/common/container';
import AuthModal from 'components/common/modal';
import CounselingModal from 'components/common/modal/counselingModal';
import Typography from 'components/common/typography';
import ModalContext from 'feature/modalContext';
import useMagazineCounseling from 'hooks/mutations/magazine/useMagazineCounseling';
import { useCallback, useContext } from 'react';

import {
  MagazineDealerLeft,
  MagazineDealerLeftWrapper,
  MagazineDealerRight,
} from './magazine.styled';

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
      onOpen(<AuthModal onClose={onClose} onClick={onClick} onOpen={onOpen} />);
  }, [handleCounseling, onClick, onClose, onOpen]);

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      border="1px solid #EAEAEC"
      borderRadius="4px"
      padding="30px 40px"
    >
      <MagazineDealerLeft>
        <Avvvatars value="금종선" size={80} />
        <MagazineDealerLeftWrapper>
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
            as="p"
            fontSize="body-16"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-5"
            space
          >
            금기사 금종선입니다!
          </Typography>
        </MagazineDealerLeftWrapper>
      </MagazineDealerLeft>
      <MagazineDealerRight>
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
      </MagazineDealerRight>
    </Container>
  );
};

export default MagazineDealer;
