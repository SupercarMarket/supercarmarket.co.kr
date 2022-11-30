import type { ModalContextProps } from 'feature/modalContext';
import { ModalProvider } from 'feature/modalContext';

const AuthModal = ({ onClick, onClose, onOpen }: ModalContextProps) => {
  return (
    <ModalProvider>
      <div>
        <h1>로그인 모달!</h1>
      </div>
    </ModalProvider>
  );
};

export default AuthModal;
