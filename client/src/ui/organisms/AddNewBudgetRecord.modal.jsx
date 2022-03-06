import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

import { Modal } from 'ui';

export const AddNewBudgetRecord = ({ isOpen, handleClose }) => {
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (value) => console.log(value);

  return (
    <Modal
      title={'Zdefiniuj budżet'}
      isOpen={isOpen}
      handleClose={handleClose}
      saveBtnDisabled={false}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field: { name, value, onChange } }) => (
            <TextField
                name={name}
                value={value}
                onChange={onChange}
                label={'Kwota'}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
        )}
        control={control}
        name={'amount'}
        defaultValue=""
        // rules={{ required: { value: true, message: 'Invalid input' } }}
    />
      </form>
    </Modal>
  );
};

AddNewBudgetRecord.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

