import React from 'react';
import * as PropTypes from 'prop-types';

import { Modal } from 'ui';

export const AddNewBudgetRecordModal = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return <Modal open={open} onClose={handleClose} title={`Zdefiniuj budżet`} />;
};

AddNewBudgetRecordModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
};
