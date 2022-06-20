import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';

export const FormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  rules,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <Select
              labelId={labelId}
              label={label}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={!!error}
            >
              {children}
            </Select>
            <FormHelperText sx={{ color: 'error.main' }}>
              {error?.message}
            </FormHelperText>
          </>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
      />
    </FormControl>
  );
};
