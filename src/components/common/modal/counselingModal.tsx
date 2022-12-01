import { ModalContextProps } from 'feature/modalContext';
import { User } from 'types/base';

import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import { ModalButtonWrapper, ModalCallWrapper } from './modal.styled';

interface CounselingModalProps extends ModalContextProps {
  user: User;
}

const CounselingModal = ({ user, onClose }: CounselingModalProps) => {
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
      <ModalCallWrapper>
        <Typography
          as="h4"
          fontSize="header-20"
          fontWeight="bold"
          color="primary-darken"
          lineHeight="150%"
        >
          {user.call}
        </Typography>
      </ModalCallWrapper>
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
      <ModalButtonWrapper>
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
        <Button variant="Primary" width="116px">
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
      </ModalButtonWrapper>
    </Container>
  );
};

export default CounselingModal;
