import React from 'react';
import * as PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';

import { CategoryCell, FormInputText, FormSelect, Modal } from 'ui';
import { BudgetService, CategoryService } from 'api';
import { formatDollarsToCents } from 'utils';

export const AddNewBudgetRecord = ({ isOpen, onClose }) => {
  const { handleSubmit, reset, control, formState } = useForm({
    mode: 'onChange',
  });

  const queryClient = useQueryClient();

  const { refetch, data: categoryList } = useQuery('categoryData', () =>
    CategoryService.findAll(true),
  );

  // let categoriesInUse = budgetsInUse?.map((category) => category.category);
  // let unusedCategories = categoryList?.filter(
  //   (obj1) => !categoriesInUse?.some((obj2) => obj1.id === obj2.id),
  // );

  // let unusedCategories = categoryList?.filter(
  //   (obj) => obj.budgetId === null
  // )

  const createBudget = (newBudget) => {
    return BudgetService.create({ requestBody: newBudget });
  };

  const { mutate } = useMutation(createBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries('budgetData');

      refetch();
    },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (values) => {
    const parsedValues = {
      amountInCents: formatDollarsToCents(parseInt(values.amountInCents)),
      categoryId: values.categoryId,
    };
    mutate(parsedValues);
    handleClose();
  };

  return (
    <Modal
      title={'Zdefiniuj budżet'}
      isOpen={isOpen}
      handleClose={handleClose}
      saveBtnDisabled={formState.isValid ? false : true}
      onSubmit={handleSubmit(onSubmit)}
    >
      {console.log('unusedCategories: ', categoryList)}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'spaceBetween',
        }}
      >
        <FormInputText
          label={'Kwota'}
          name={'amountInCents'}
          defaultValue={''}
          control={control}
          type="number"
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
          label="Kategoria"
          control={control}
          defaultValue={''}
          rules={{
            required: { value: true, message: 'Wybierz kategorię' },
          }}
        >
          {categoryList?.map((category) => (
            <MenuItem key={category.id} value={category.id}>
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
  onClose: PropTypes.func,
};
