import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller } from 'react-hook-form';

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
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Select
              labelId={labelId}
              label={label}
              onChange={onChange}
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
