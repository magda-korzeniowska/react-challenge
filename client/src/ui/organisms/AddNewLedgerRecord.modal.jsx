import React from 'react';
import * as PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import MenuItem from '@mui/material/MenuItem';

import { CategoryService, LedgerService } from 'api';
import { CategoryCell, FormInputText, FormSelect, Modal } from 'ui';
import { formatDollarsToCents } from 'utils';

export const AddNewLedgerRecord = ({ type, isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const { data: categoryList } = useQuery('categoryData', () =>
    CategoryService.findAll(),
  );

  const createLedger = (newLedger) => {
    return LedgerService.create({ requestBody: newLedger });
  };

  const { mutate } = useMutation(createLedger, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('ledgerData');
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
      mode: type,
      title: values.title,
      amountInCents: formatDollarsToCents(parseInt(values.amountInCents)),
      categoryId: values.categoryId,
    };
    mutate(parsedValues);
    handleClose();
  };

  return (
    <Modal
      title={type === 'INCOME' ? 'Dodaj wpływ' : 'Dodaj wydatek'}
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
    </Modal>
  );
};

AddNewLedgerRecord.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
