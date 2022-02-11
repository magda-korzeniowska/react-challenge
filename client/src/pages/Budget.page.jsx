import React from 'react';
import { useQuery } from 'react-query';

import { ActionHeader, Button, Card, ColorBox, Error, Loader, LocalizedDate, Money, NoContent, Page, Table } from 'ui';
import { Box, Grid } from '@mui/material';
import { BudgetService } from 'api';

export const BudgetPage = () => {

  const fetchBudget = () => {
    return BudgetService.findAll();
  }

  const { isLoading, data, isError, isFetching, refetch, isSuccess } = useQuery(
    'budgets',
    fetchBudget,
    {
      enabled: false,
      select: (data) => {
        function createData(name, plannedExpenses, currentAmount, status, date) {
          return {
            name,
            plannedExpenses,
            currentAmount,
            status,
            date
          };
        }

        const rows = data.map((budget) => (
          createData(budget.category.name, budget.amountInCents, budget.currentSpending, 'shopping', budget.createdAt))
        )
        return rows;
      }
    },
  );

  const headCells = [
    {
      id: 'name',
      label: 'Nazwa',
      renderCell:
        (row) => (
          <Box sx={{display: 'flex'}}>
             <ColorBox color={'#37C4D7'}/>
             {row.name}
          </Box>
        )
    },
    {
      id: 'planned-expenses',
      label: 'Planowane wydatki',
      renderCell:
        (row) => <Money inCents={row.plannedExpenses} />,
    },
    {
      id: 'current-amount',
      label: 'Obecna kwota',
      renderCell:
        (row) => <Money inCents={row.currentAmount} />,
    },
    {
      id: 'status',
      label: 'Status',
      renderCell:
        (row) => row.status
    },
    {
      id: 'date',
      label: 'Data utworzenia',
      renderCell:
        (row) => <LocalizedDate date={row.date} />,
    },
  ];

  const getUniqueId = (n) => n.name;
  const deleteRecords = () => null;


  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój budżet"
            renderActions={() => (
              <Button
                variant='contained'
                color='primary'
                size='medium'
                disabled={false}
                startIcon={false}
                endIcon={false}
                onClick={refetch}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        {(isLoading || isFetching) && <Loader />}
        {isError && <Error />}
        {(isSuccess && !data) && <NoContent />}

        <Grid container>
          <Grid item xs={12}>
            {data &&
              <Table
                headCells={headCells}
                rows={data}
                getUniqueId={getUniqueId}
                deleteRecords={deleteRecords}
              />
            }
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
