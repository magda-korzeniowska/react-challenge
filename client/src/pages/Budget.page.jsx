import React from 'react';
import { useQuery } from 'react-query';

import { ActionHeader, Button, Card, Error, Loader, NoContent, Page } from 'ui';
import { Grid } from '@mui/material';
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
    },
  );

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
              >Zdefiniuj budżet</Button>
            )}
          />
        }
      >
        {(isLoading || isFetching) && <Loader />}
        {isError && <Error />}
        {(isSuccess && !data) && <NoContent />}
        <div>
          {data?.map((budget) => (
            <div key={budget.id}>{budget.category.name}</div>
          ))}
        </div>
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
      </Card>
    </Page>
  );
};
