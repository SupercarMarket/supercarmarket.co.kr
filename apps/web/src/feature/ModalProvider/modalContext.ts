import * as React from 'react';

export interface ModalContextProps {
  onClose: (callback?: () => void) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onOpen: (children: React.ReactNode) => void;
}

export const ModalInitialValue: ModalContextProps = {
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

export const ModalContext = React.createContext(ModalInitialValue);
