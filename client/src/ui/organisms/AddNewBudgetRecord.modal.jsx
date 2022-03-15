import React from 'react';
import * as PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';

import { BudgetService } from 'api';
import { CategoryCell, FormInputText, FormSelect, Modal } from 'ui';
import { formatDollarsToCents } from 'utils';

export const AddNewBudgetRecord = ({
  isOpen,
  onClose,
  categoryList,
  refetchCategories,
}) => {
  const queryClient = useQueryClient();

  const createBudget = (newBudget) => {
    return BudgetService.create({ requestBody: newBudget });
  };

  const { mutate } = useMutation(createBudget, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('budgetData');
      refetchCategories();
    },
  });

  const { handleSubmit, reset, control, formState } = useForm({
    mode: 'onChange',
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'spaceBetween',
        }}
      >
        <FormInputText
          label="Kwota"
          name="amountInCents"
          defaultValue=""
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
          defaultValue=""
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
  categoryList: PropTypes.array,
  refetchCategories: PropTypes.func,
};
