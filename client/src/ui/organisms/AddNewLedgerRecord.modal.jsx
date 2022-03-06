import React from 'react';
import * as PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import { FormInputText, Modal } from 'ui';

export const AddNewLedgerRecord = ({ type, isOpen, handleClose }) => {
  // const { handleSubmit, reset, control } = useForm();
  // const onSubmit = (value) => console.log(value);

  return (
    <Modal
      title={type === 'INCOME' ? 'Dodaj wpływ' : 'Dodaj wydatek'}
      isOpen={isOpen}
      handleClose={handleClose}
      saveBtnDisabled={false}
      // onSubmit={handleSubmit(onSubmit)}
    >
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          render={({ field: { name, value, onChange } }) => (
            <TextField
              name={name}
              value={value}
              onChange={onChange}
              label={'Nazwa'}
            />
          )}
          control={control}
          name={'name'}
          defaultValue=""
        />
      </form> */}
    </Modal>
  );
};

AddNewLedgerRecord.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
