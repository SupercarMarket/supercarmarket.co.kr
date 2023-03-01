import { Portal } from '@supercarmarket/ui';
import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { createContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  const pathname = usePathname();
  const { replace } = useRouter();

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

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.currentTarget !== e.target) return;

      const links = pathname?.split('/');

      if (!links) return;

      const currentPath = links.pop();
      let href = '';

      if (!currentPath?.length) href = '/';
      else href = `/${links[links.length - 1]}`;

      onClose(() => {
        replace(href);
      });
    },
    [pathname, replace]
  );

  const value = useMemo(() => ({ onClick, onClose, onOpen }), [onClick]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isModalOpen && (
        <Portal>
          <div
            onClick={handleClick}
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
