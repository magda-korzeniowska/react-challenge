import { Grid, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Bar } from 'react-chartjs-2';

import { BudgetService } from 'api';
import { Card, Loader, Error, NoContent } from 'ui';
import { BUDGET_QUERY } from 'queryKeys';

export const BudgetChartWidget = () => {
  const { isLoading, error, data } = useQuery(BUDGET_QUERY, () =>
    BudgetService.findAll(),
  );

  const getDataForChart = useCallback(() => {
    if (!data) return;

    return {
      labels: data.map(({ category }) => `${category.name} %`),
      datasets: [
        {
          axis: 'y',
          data: data.map(
            ({ currentSpendingPercent }) => currentSpendingPercent,
          ),
          fill: false,
          backgroundColor: data.map(({ category }) => category.color),
          borderWidth: 0,
        },
      ],
    };
  }, [data]);

  return (
    <Card
      title={<Typography variant={'h4'}>Budżet</Typography>}
      subheader={'Podsumowanie wydatków'}
    >
      {isLoading && <Loader />}
      {!isLoading && error && <Error error={error} />}
      {!isLoading && !error && !getDataForChart() && <NoContent />}

      {!error && !isLoading && getDataForChart() && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Bar
            type={'bar'}
            data={getDataForChart()}
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: true,
              plugins: { legend: { display: false } },
            }}
          />
        </Grid>
      )}
    </Card>
  );
};
