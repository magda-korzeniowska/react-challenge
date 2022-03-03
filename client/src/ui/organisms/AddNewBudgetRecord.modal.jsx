import React from 'react';
import * as PropTypes from 'prop-types';

import { Modal } from 'ui';

export const AddNewBudgetRecord = ({ isOpen, handleClose }) => {
  return (
    <Modal
      title={'Zdefiniuj budżet'}
      isOpen={isOpen}
      handleClose={handleClose}
      saveBtnDisabled={false}
    />
  );
};

AddNewBudgetRecord.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
