import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import * as PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { CategoryCell, FormSelect, Modal } from 'ui';
import { CategoryService } from 'api';

export const AddNewBudgetRecord = ({ isOpen, handleClose, budgetsInUse }) => {
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (value) => console.log(value);

  const { data } = useQuery('categoryData', () => CategoryService.findAll());

  let categoriesInUse = budgetsInUse?.map((category) => category.category);
  let newCategories = data?.filter(
    (obj1) => !categoriesInUse?.some((obj2) => obj1.id === obj2.id),
  );

  return (
    <Modal
      title={'Zdefiniuj budżet'}
      isOpen={isOpen}
      handleClose={handleClose}
      saveBtnDisabled={false}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'spaceBetween',
        }}
      >
        <Controller
          render={({
            field: { ref, value, onChange },
            fieldState: { error },
            formState,
          }) => (
            <TextField
              inputRef={ref}
              value={value}
              onChange={onChange}
              label={'Kwota'}
              error={!!error}
              helperText={error?.message}
              type="number"
              sx={{ marginBottom: '30px'}}
            />
          )}
          control={control}
          name={'amount'}
          defaultValue=""
          rules={{
            required: { value: true, message: 'Kwota nie może być pusta' },
            min: { value: 0, message: 'Kwota musi być większa niż 0'},
            max: { value: 1000000, message: 'Kwota nie może być większa niż 1000000'}
          }}
        />

        <FormSelect
          name="category"
          label="Wybierz kategorię"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: 'Wybierz kategorię' },
          }}
        >
          {newCategories?.map((category) => (
            <MenuItem key={category.name} value={category.name}>
              <CategoryCell color={category.color} name={category.name} />
            </MenuItem>
          ))}
        </FormSelect>
      </form>
    </Modal>
  );
};

AddNewBudgetRecord.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
