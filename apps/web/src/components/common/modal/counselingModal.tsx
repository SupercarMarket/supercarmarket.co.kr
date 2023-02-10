import { ModalContextProps } from 'feature/modalContext';
import { User } from 'types/base';

import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import * as style from './modal.styled';

interface CounselingModalProps extends ModalContextProps {
  user: User;
  handleCounseling: () => void;
}

const CounselingModal = ({
  user,
  onClose,
  handleCounseling,
}: CounselingModalProps) => {
  return (
    <Container display="flex" flexDirection="column" alignItems="center">
      <Typography
        as="h4"
        fontSize="header-20"
        fontWeight="bold"
        color="greyScale-6"
        lineHeight="150%"
        style={{
          marginBottom: '16px',
        }}
      >
        담당자에게 연락처가 전달됩니다
      </Typography>
      <Wrapper css={style.modalCallWrapper}>
        <Typography
          as="h4"
          fontSize="header-20"
          fontWeight="bold"
          color="primary-darken"
          lineHeight="150%"
        >
          {user.call}
        </Typography>
      </Wrapper>
      <Typography
        as="p"
        fontSize="body-16"
        fontWeight="regular"
        color="greyScale-5"
        lineHeight="150%"
        style={{
          marginBottom: '38px',
        }}
      >
        담당자가 확인 후 연락드리겠습니다
      </Typography>
      <Wrapper css={style.modalButtonWrapper}>
        <Button variant="Primary-Line" width="160px" onClick={onClose}>
          <Typography
            as="span"
            fontSize="body-16"
            fontWeight="regular"
            color="primary"
            lineHeight="150%"
          >
            취소
          </Typography>
        </Button>
        <Button variant="Primary" width="116px" onClick={handleCounseling}>
          <Typography
            as="span"
            fontSize="body-16"
            fontWeight="regular"
            color="white"
            lineHeight="150%"
          >
            신청하기
          </Typography>
        </Button>
      </Wrapper>
    </Container>
  );
};

export default CounselingModal;
