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
        className="modalWrap"
        onClick={(event) => {
          event.stopPropagation();
        }}
        ref={ref}
      >
        <div className="modalLayout" onWheel={whellEvent}>
          {children}
        </div>
        <span className="dim" />
      </div>,
      el
    );
  } else return null;
};

export default Modal;
