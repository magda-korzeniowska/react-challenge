import React from 'react';
import * as PropTypes from 'prop-types';

import { Modal } from 'ui';

const translationKeys = {
  income: 'wpływ',
  expense: 'wydatek',
};

export const AddNewLedgerRecordModal = ({ open, onClose, type }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Dodaj ${translationKeys[type.toLowerCase()]}`}
    />
  );
};

AddNewLedgerRecordModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
};
