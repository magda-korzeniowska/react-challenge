import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { BudgetService } from 'api';
import { useNotification } from 'hooks';
import {
  CategoryCell,
  Error,
  Loader,
  LocalizedDate,
  Money,
  NoContent,
  Table,
} from 'ui';

export const BudgetTableWidget = () => {
  const showSnackbar = useNotification();

  const queryClient = useQueryClient();

  const { isLoading, data, isError, isFetching, error } = useQuery(
    'budgetData',
    () => BudgetService.findAll(),
  );

  const deleteBudget = (budgetsToRemove) => {
    return BudgetService.remove({ ids: budgetsToRemove });
  };

  const { mutate } = useMutation(deleteBudget, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('budgetData');
      await queryClient.invalidateQueries('partialCategoryData');
      showSnackbar('delete');
    },
    onError: () => showSnackbar('error'),
  });

  const getStatusText = (row) => {
    if (row.currentSpending === row.amountInCents) return 'wykorzystany';
    if (row.currentSpending > row.amountInCents) return 'przekroczony';
    if (row.currentSpending < row.amountInCents) return 'w normie';
  };

  const headCells = [
    {
      id: 'name',
      label: 'Nazwa',
      renderCell: (row) => (
        <CategoryCell color={row.category?.color} name={row.category?.name} />
      ),
    },
    {
      id: 'planned-expenses',
      label: 'Planowane wydatki',
      renderCell: (row) => <Money inCents={row.amountInCents} />,
    },
    {
      id: 'current-amount',
      label: 'Obecna kwota',
      renderCell: (row) => <Money inCents={row.currentSpending} />,
    },
    {
      id: 'status',
      label: 'Status',
      renderCell: (row) => getStatusText(row),
    },
    {
      id: 'date',
      label: 'Data utworzenia',
      renderCell: (row) => <LocalizedDate date={row.createdAt} />,
    },
  ];

  return (
    <>
      {(isLoading || isFetching) && <Loader />}
      {isError && <Error error={error} />}
      {data?.length === 0 && <NoContent />}

      {data?.length > 0 && (
        <Table
          headCells={headCells}
          rows={data}
          getUniqueId={(element) => element.id}
          deleteRecords={(budgetsToRemove) => mutate(budgetsToRemove)}
        />
      )}
    </>
  );
};
