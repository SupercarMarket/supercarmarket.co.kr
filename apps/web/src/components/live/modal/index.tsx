import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface I_modalProps {
  open: boolean;
  children?: ReactNode;
}

/**
 * @param open isOpen Modal boolean, Default: false
 */
const Modal = ({ open, children }: I_modalProps) => {
  useEffect(() => {
    if (open) window.document.body.style.overflow = 'hidden';
    else window.document.body.style.overflow = 'auto';
  }, [open]);

  if (open) {
    const el = document.body;
    return ReactDOM.createPortal(
      <div
        style={{
          position: 'fixed',
          top: '0',
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div
          style={{
            top: '50%',
            zIndex: '1000',
            position: 'fixed',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {children}
        </div>
        <span
          style={{
            opacity: '0.6',
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#000000',
            zIndex: '100',
            top: '0',
          }}
        />
      </div>,
      el
    );
  } else return null;
};

export default Modal;
