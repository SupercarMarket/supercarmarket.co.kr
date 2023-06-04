import Modal from './index';
import React from 'react';
import liveCss from 'public/css/live.module.css';

/**
 *
 */

interface I_loader {
  isOpen: boolean;
}

const Loader = (props: I_loader) => {
  return (
    <Modal open={props.isOpen}>
      <span className={liveCss.loader} />
    </Modal>
  );
};
export default Loader;
