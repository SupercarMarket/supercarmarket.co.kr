import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { ModalContextProps } from 'feature/modalContext';
import { ModalProvider } from 'feature/modalContext';
import Link from 'next/link';

import * as style from './modal.styled';

const TemporaryStorageModal = ({
  onClose,
  onInit,
  description = '로그인이 필요한 서비스입니다.',
}: ModalContextProps & {
  onInit: () => void;
  description?: string;
}) => {
  return (
    <ModalProvider>
      <Container
        display="flex"
        flexDirection="column"
        alignItems="center"
        zIndex={999}
      >
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
          임시저장된 글이 있습니다. 불러오시겠습니까?
        </Typography>
        <Typography
          as="p"
          fontSize="body-16"
          fontWeight="regular"
          color="greyScale-5"
          lineHeight="150%"
          space
          style={{
            marginBottom: '38px',
          }}
        >
          {`취소를 누르면 임시저장 글이 삭제되고\n새 글을 작성할 수 있습니다.`}
        </Typography>
        <Wrapper css={style.modalButtonWrapper}>
          <Button variant="Primary-Line" width="160px" onClick={onClose}>
            취소
          </Button>
          <Button variant="Primary" width="116px" onClick={onInit}>
            불러오기
          </Button>
        </Wrapper>
      </Container>
    </ModalProvider>
  );
};

export default TemporaryStorageModal;
