import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  container?: Element;
  children: ReactNode;
}

const Portal: React.FC<Props> = ({
  children,
  container = document.body,
}): React.ReactPortal => createPortal(children, container);

export default Portal;
