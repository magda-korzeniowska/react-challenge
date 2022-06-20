import React from 'react';
import * as PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { MenuItem } from '@mui/material';

import { CategoryService, LedgerService } from 'api';
import { useNotification } from 'hooks';
import {
  CategoryCell,
  Error,
  FormInputText,
  FormSelect,
  Loader,
  Modal,
  NoContent,
} from 'ui';
import { formatDollarsToCents } from 'utils';

export const AddNewLedgerRecord = ({ type, isOpen, onClose }) => {
  const showSnackbar = useNotification();
  const queryClient = useQueryClient();

  const {
    data: categoryList,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery('categoryData', () => CategoryService.findAll());

  const createLedger = (newLedger) => {
    return LedgerService.create({ requestBody: newLedger });
  };

  const { mutate } = useMutation(createLedger, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('ledgerData');
      await queryClient.invalidateQueries('summaryData');
      await queryClient.invalidateQueries('budgetData');
      showSnackbar(type.toLowerCase());
    },
    onError: () => showSnackbar('error'),
  });

  const { handleSubmit, reset, control, formState } = useForm({
    mode: 'all',
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values) => {
    mutate({
      mode: type,
      title: values.title,
      amountInCents: formatDollarsToCents(parseInt(values.amountInCents)),
      categoryId: values.categoryId,
    });
    handleClose();
  };

  return (
    <Modal
      title={type === 'INCOME' ? 'Dodaj wpływ' : 'Dodaj wydatek'}
      isOpen={isOpen}
      handleClose={handleClose}
      isSaveBtnDisabled={formState.isValid ? false : true}
      onSubmit={handleSubmit(onSubmit)}
    >
      {(isLoading || isFetching) && <Loader />}
      {isError && <Error error={error} />}
      {categoryList?.length === 0 && <NoContent />}

      {categoryList?.length > 0 && (
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'spaceBetween',
          }}
        >
          <FormInputText
            label="Nazwa"
            name="title"
            defaultValue=""
            control={control}
            rules={{
              required: { value: true, message: 'Nazwa nie może być pusta' },
              pattern: {
                value: /.*\S.*/,
                message: 'Nazwa nie może być pusta',
              },
            }}
          />
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
          {type === 'EXPENSE' && (
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
          )}
        </form>
      )}
    </Modal>
  );
};

AddNewLedgerRecord.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
