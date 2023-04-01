import * as React from 'react';
import { Portal } from '@supercarmarket/ui';
import { ModalContext } from './modalContext';

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContents, setModalContents] = React.useState<React.ReactNode>(
    <></>
  );

  const onOpen = (children: React.ReactNode) => {
    setIsModalOpen(true);
    setModalContents(children);
  };

  const onClose = (callback?: () => void) => {
    setIsModalOpen(false);
    setModalContents(<></>);
    if (callback) callback();
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    (e) => {
      if (e.currentTarget !== e.target) return;

      onClose();
    },
    []
  );

  const value = React.useMemo(() => ({ onClick, onClose, onOpen }), [onClick]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isModalOpen && (
        <Portal>
          <>{modalContents}</>
        </Portal>
      )}
    </ModalContext.Provider>
  );
};

export { ModalProvider };

export default ModalContext;
