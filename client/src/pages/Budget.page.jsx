import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import AddIcon from '@mui/icons-material/Add';

import {
  ActionHeader,
  Button,
  Card,
  ColorBox,
  Error,
  Loader,
  LocalizedDate,
  Money,
  NoContent,
  Page,
  Table,
} from 'ui';
import { Box, Grid } from '@mui/material';
import { BudgetService } from 'api';

export const BudgetPage = () => {
  const queryClient = useQueryClient();

  const fetchBudget = () => {
    return BudgetService.findAll();
  };

  const deleteBudget = (budgetsToRemove) => {
    return BudgetService.remove({ ids: budgetsToRemove });
  };

  const { isLoading, data, isError, isFetching, isSuccess } = useQuery(
    'budgetData',
    fetchBudget,
    {
      select: (data) => {
        function createData(
          id,
          name,
          plannedExpenses,
          currentAmount,
          status,
          date,
        ) {
          return {
            id,
            name,
            plannedExpenses,
            currentAmount,
            status,
            date,
          };
        }

        const rows = data.map((budget) => {
          let status;
          if (budget.currentSpending === budget.amountInCents) {
            status = 'wykorzystany';
          } else if (budget.currentSpending > budget.amountInCents) {
            status = 'przekroczony';
          } else {
            status = 'w normie';
          }
          return createData(
            budget.id,
            budget.category.name,
            budget.amountInCents,
            budget.currentSpending,
            status,
            budget.createdAt,
          );
        });
        return rows;
      },
    },
  );

  const { mutate } = useMutation(deleteBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries('budgetData');
    },
  });

  const headCells = [
    {
      id: 'name',
      label: 'Nazwa',
      renderCell: (row) => (
        <Box sx={{ display: 'flex' }}>
          <ColorBox color={'#37C4D7'} />
          {row.name}
        </Box>
      ),
    },
    {
      id: 'planned-expenses',
      label: 'Planowane wydatki',
      renderCell: (row) => <Money inCents={row.plannedExpenses} />,
    },
    {
      id: 'current-amount',
      label: 'Obecna kwota',
      renderCell: (row) => <Money inCents={row.currentAmount} />,
    },
    {
      id: 'status',
      label: 'Status',
      renderCell: (row) => row.status,
    },
    {
      id: 'date',
      label: 'Data utworzenia',
      renderCell: (row) => <LocalizedDate date={row.date} />,
    },
  ];

  const getUniqueId = (row) => row.id;

  const deleteRecords = (budgetsToRemove) => mutate(budgetsToRemove);

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój budżet"
            renderActions={() => (
              <Button
                variant="contained"
                color="primary"
                size="medium"
                disabled={false}
                startIcon={<AddIcon />}
                endIcon={false}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        {(isLoading || isFetching) && <Loader />}
        {isError && <Error />}
        {isSuccess && data.length === 0 && <NoContent />}
        
        <Grid container>
          <Grid item xs={12}>
            {data && data.length > 0 && (
              <Table
                headCells={headCells}
                rows={data}
                getUniqueId={getUniqueId}
                deleteRecords={deleteRecords}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
