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
        className="modalWrap"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="modalLayout">{children}</div>
        <span className="dim" />
      </div>,
      el
    );
  } else return null;
};

export default Modal;
