import React from 'react';

import ReactDOM from 'react-dom';

interface I_modalProps {
  open: boolean;

  children?: React.ReactNode;
}

/**
 * @param open isOpen Modal boolean, Default: false
 */
const Modal = ({ open, children }: I_modalProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const wheellDiff = (event: WheelEvent) => {
    event.preventDefault();
  };

  const whellEvent = (event: React.WheelEvent) => {
    const targetEl = event.currentTarget as HTMLElement;
    const TargetScrollY = targetEl.scrollTop;
    targetEl.scrollTo({ top: TargetScrollY + event.deltaY, behavior: 'auto' });
  };

  React.useEffect(() => {
    if (open) {
      window.document.body.addEventListener('wheel', wheellDiff, {
        passive: false,
      });
    } else {
      window.document.body.removeEventListener('wheel', wheellDiff);
    }
    return () => {
      window.document.body.removeEventListener('wheel', wheellDiff);
    };
  }, [open]);

  if (open) {
    const el = document.body;
    return ReactDOM.createPortal(
      <div
        style={modalWrapStyle}
        onClick={(event) => {
          event.stopPropagation();
        }}
        ref={ref}
      >
        <div style={modalLayoutStyle} onWheel={whellEvent}>
          {children}
        </div>
        <span style={dimStyle} />
      </div>,
      el
    );
  } else return null;
};

export default Modal;

const modalWrapStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 999,
};

const modalLayoutStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: '1000',
  transform: 'translate(-50%, -50%)',
  borderRadius: '6px',
  maxHeight: '95%',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
};

const dimStyle: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  right: '0',
  left: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
};
