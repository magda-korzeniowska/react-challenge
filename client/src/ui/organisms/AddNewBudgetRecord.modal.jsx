import React from 'react';
import * as PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { MenuItem } from '@mui/material';

import { BudgetService, CategoryService } from 'api';
import { useNotification } from 'hooks';
import {
  CategoryCell,
  Error,
  FormInputText,
  FormSelect,
  Loader,
  Modal,
} from 'ui';
import { formatDollarsToCents } from 'utils';

export const AddNewBudgetRecord = ({ isOpen, onClose }) => {
  const showSnackbar = useNotification();
  const queryClient = useQueryClient();

  const createBudget = (newBudget) => {
    return BudgetService.create({ requestBody: newBudget });
  };

  const {
    data: categoryList,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery('partialCategoryData', () => CategoryService.findAll(true));

  const { mutate } = useMutation(createBudget, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('budgetData');
      await queryClient.invalidateQueries('partialCategoryData');
      showSnackbar('budget');
    },
    onError: () => showSnackbar('error'),
  });

  const { handleSubmit, reset, control, formState } = useForm({
    mode: 'onChange',
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values) => {
    mutate({
      amountInCents: formatDollarsToCents(parseInt(values.amountInCents)),
      categoryId: values.categoryId,
    });
    handleClose();
  };

  return (
    <Modal
      title={'Zdefiniuj budżet'}
      isOpen={isOpen}
      handleClose={handleClose}
      isSaveBtnDisabled={formState.isValid ? false : true}
      onSubmit={handleSubmit(onSubmit)}
    >
      {(isLoading || isFetching) && <Loader />}
      {isError && <Error error={error} />}

      {!categoryList?.length ? (
        'Brak kategorii do przypisania'
      ) : (
        <form
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
              setValueAs: (value) => value.trim(),
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
              <MenuItem key={`category---${category.id}`} value={category.id}>
                <CategoryCell color={category.color} name={category.name} />
              </MenuItem>
            ))}
          </FormSelect>
        </form>
      )}
    </Modal>
  );
};

AddNewBudgetRecord.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
