import { Portal } from '@supercarmarket/ui';
import * as React from 'react';

interface ModalProviderProps {
  children: React.ReactNode;
}

interface ModalContextProps {
  onClose: () => void;
  onClick: (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onOpen: (children: React.ReactNode) => void;
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

const ModalContext = React.createContext(ModalInitialValue);

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContents, setModalContents] = React.useState<React.ReactNode>(
    <></>
  );

  const onOpen = (children: React.ReactNode) => {
    setIsModalOpen(true);
    setModalContents(children);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setModalContents(<></>);
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
                borderRadius: '4px',
                boxSizing: 'border-box',
                background: '#fff',
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
