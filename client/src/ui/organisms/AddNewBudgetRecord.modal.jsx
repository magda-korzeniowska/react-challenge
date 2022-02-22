import React from 'react';

import { Modal } from 'ui/molecules/Modal';

export const AddNewBudgetRecord = ({ type, isOpen, handleClose }) => {
  return (
    <Modal
      title={'Zdefiniuj budżet'}
      isOpen={isOpen}
      handleClose={handleClose}
    ></Modal>
  );
};