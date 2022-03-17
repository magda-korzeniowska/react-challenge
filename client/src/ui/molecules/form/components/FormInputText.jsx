import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export const FormInputText = ({
  label,
  name,
  defaultValue,
  rules,
  control,
  type,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField
          value={value}
          label={label}
          type={type}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          sx={{ marginBottom: '30px' }}
        />
      )}
    />
  );
};
