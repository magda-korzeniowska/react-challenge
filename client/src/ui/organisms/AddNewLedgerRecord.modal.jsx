import React from 'react';

import { Modal } from 'ui/molecules/Modal';

export const AddNewLedgerRecord = ({ type, isOpen, handleClose }) => {
  return (
    <Modal
      title={type === 'INCOME' ? 'Dodaj wpływ' : 'Dodaj wydatek'}
      isOpen={isOpen}
      handleClose={handleClose}
    ></Modal>
  );
};
