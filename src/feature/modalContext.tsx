import Portal from 'components/common/portal';
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
  onClose: () => void;
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

  const onClose = () => {
    setIsModalOpen(false);
    setModalContents(<></>);
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
          <div
            onClick={onClick}
            style={{
              position: 'fixed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
            }}
          >
            <div
              style={{
                width: '390px',
                padding: '34px 24px 24px 24px',
                border: '1px solid #C3C3C7',
                borderRadius: 'rpx',
                boxSizing: 'border-box',
              }}
            >
              {modalContents}
            </div>
          </div>
        </Portal>
      )}
    </ModalContext.Provider>
  );
};

export { ModalProvider };
export type { ModalContextProps };

export default ModalContext;
