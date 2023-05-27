import Modal from './index';
import React from 'react';

/**
 *
 */

interface I_loader {
  isOpen: boolean;
}

const Loader = (props: I_loader) => {
  return (
    <Modal open={props.isOpen}>
      <span style={loaderStyle} />
    </Modal>
  );
};
export default Loader;

const loaderStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  border: '5px solid #FFF',
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  animation: 'rotation 1s linear infinite',
};
