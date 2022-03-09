import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { CategoryCell, FormSelect, Modal } from 'ui';
import { BudgetService, CategoryService } from 'api';
import { formatDollarsToCents } from 'utils';

export const AddNewBudgetRecord = ({ isOpen, handleClose, budgetsInUse }) => {

  const { handleSubmit, reset, control, formState } = useForm({
    mode: 'onChange',
  });

  const { data: categoryList } = useQuery('categoryData', () =>
    CategoryService.findAll(),
  );

  let categoriesInUse = budgetsInUse?.map((category) => category.category);
  let unusedCategories = categoryList?.filter(
    (obj1) => !categoriesInUse?.some((obj2) => obj1.id === obj2.id),
  );

  const queryClient = useQueryClient();

  const createBudget = (newBudget) => {
    return BudgetService.create({ requestBody: newBudget });
  };

  const { mutate } = useMutation(createBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries('budgetData');
      reset();
      handleClose();
    },
  });

  const onSubmit = (values) => {
    const parsedValues = {
      // ...values,
      amountInCents: formatDollarsToCents(parseInt(values.amountInCents)),
      categoryId: values.categoryId,
    };
    mutate(parsedValues);
  };

  return (
    <Modal
      title={'Zdefiniuj budżet'}
      isOpen={isOpen}
      handleClose={handleClose}
      saveBtnDisabled={formState.isValid ? false : true}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'spaceBetween',
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
              sx={{ marginBottom: '30px' }}
            />
          )}
          control={control}
          name={'amountInCents'}
          defaultValue=""
          rules={{
            required: { value: true, message: 'Kwota nie może być pusta' },
            min: { value: 0, message: 'Kwota musi być większa niż 0' },
            max: {
              value: 1000000,
              message: 'Kwota nie może być większa niż 1000000',
            },
          }}
        />

        <FormSelect
          name="categoryId"
          label="Wybierz kategorię"
          control={control}
          defaultValue={''}
          rules={{
            required: { value: true, message: 'Wybierz kategorię' },
          }}
        >
          {unusedCategories?.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <CategoryCell color={category.color} name={category.name} />
            </MenuItem>
          ))}
        </FormSelect>
      </form>
    </Modal>
  );
};
