import React from 'react';
import * as PropTypes from 'prop-types';

import { Modal } from 'ui';

export const AddNewLedgerRecord = ({ type, isOpen, handleClose }) => {
  return (
    <Modal
      title={type === 'INCOME' ? 'Dodaj wpływ' : 'Dodaj wydatek'}
      isOpen={isOpen}
      handleClose={handleClose}
      saveBtnDisabled={false}
    />
  );
};

AddNewLedgerRecord.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
