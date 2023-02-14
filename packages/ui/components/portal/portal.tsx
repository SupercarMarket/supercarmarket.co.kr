import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactElement;
}

const Portal = ({ children }: PortalProps): React.ReactPortal | null => {
  const container = document.querySelector('#__portal');
  if (!container) return null;
  return createPortal(children, container);
};

export { Portal };
export type { PortalProps };
