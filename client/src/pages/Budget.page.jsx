import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import AddIcon from '@mui/icons-material/Add';

import {
  ActionHeader,
  Button,
  Card,
  CategoryCell,
  Error,
  Loader,
  LocalizedDate,
  Money,
  NoContent,
  Page,
  Table,
} from 'ui';
import { Grid } from '@mui/material';
import { BudgetService } from 'api';

export const BudgetPage = () => {
  const queryClient = useQueryClient();

  const { isLoading, data, isError, isFetching } = useQuery('budgetData', () =>
    BudgetService.findAll(),
  );

  const deleteBudget = (budgetsToRemove) => {
    return BudgetService.remove({ ids: budgetsToRemove });
  };

  const { mutate } = useMutation(deleteBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries('budgetData');
    },
  });

  const getStatusText = (budget) => {
    if (budget.currentSpending === budget.amountInCents) {
      return 'wykorzystany';
    } else if (budget.currentSpending > budget.amountInCents) {
      return 'przekroczony';
    } else {
      return 'w normie';
    }
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
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój budżet"
            renderActions={() => (
              <Button variant="contained" startIcon={<AddIcon />}>
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
            {(isLoading || isFetching) && <Loader />}
            {isError && <Error />}
            {!data?.length && <NoContent />}

            {data?.length > 0 && (
              <Table
                headCells={headCells}
                rows={data}
                getUniqueId={(element) => element.id}
                deleteRecords={(budgetsToRemove) => mutate(budgetsToRemove)}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
