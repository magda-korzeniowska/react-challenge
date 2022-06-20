import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

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
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <TextField
          value={value}
          label={label}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error ? error.message : null}
          sx={{ marginBottom: '30px' }}
        />
      )}
    />
  );
};
