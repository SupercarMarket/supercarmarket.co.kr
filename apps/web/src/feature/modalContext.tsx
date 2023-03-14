import { Portal } from '@supercarmarket/ui';
import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { createContext, useState } from 'react';

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextProps {
  onClose: (callback?: () => void) => void;
  onClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onOpen: (children: ReactNode) => void;
}

const ModalInitialValue: ModalContextProps = {
  onClose: () => {
    return;
  },
  onClick: () => {
    return;
  },
  onOpen: () => {
    return;
  },
};

const ModalContext = createContext(ModalInitialValue);

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState<ReactNode>(<></>);

  const onOpen = (children: ReactNode) => {
    setIsModalOpen(true);
    setModalContents(children);
  };

  const onClose = (callback?: () => void) => {
    setIsModalOpen(false);
    setModalContents(<></>);
    if (callback) callback();
  };

  const onClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (e.currentTarget !== e.target) return;

    onClose();
  }, []);

  const value = useMemo(() => ({ onClick, onClose, onOpen }), [onClick]);

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
export type { ModalContextProps };

export default ModalContext;
