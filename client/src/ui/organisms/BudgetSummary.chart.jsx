import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from 'chart.js';

import { ActionHeader, Card, Error, Loader } from 'ui';
import { BudgetService } from 'api';

export const BudgetSummary = () => {
  Chart.register(CategoryScale, LinearScale, Tooltip, BarElement);

  const {
    data: budgetData,
    isLoading,
    error,
  } = useQuery('budgetData', () => BudgetService.findAll(), {
    select: useCallback((response) => {
      return {
        labels: response.map(({ category }) => `${category.name} %`),
        datasets: [
          {
            data: response.map(
              ({ currentSpendingPercent }) => currentSpendingPercent,
            ),
            backgroundColor: response.map(({ category }) => category.color),
          },
        ],
      };
    }, []),
  });

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          stepSize: 50,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        usePointStyle: 'star',
        callbacks: {
          label: (context) => context.formattedValue + '%',
          title: () => {},
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card
      title={<ActionHeader variant={'h4'} title="Budżet" />}
      subheader="Podsumowanie wydatków"
    >
      {isLoading && <Loader />}
      {!isLoading && error && <Error error={error} />}
      {!isLoading &&
        !error &&
        (budgetData?.labels.length === 0 ||
          budgetData?.datasets[0].data.every((item) => item === 0)) && (
          <Typography variant={'h5'} marginTop={4} align={'center'}>
            Brak wyników
          </Typography>
        )}
      {!isLoading &&
        !error &&
        budgetData?.labels.length !== 0 &&
        !budgetData?.datasets[0].data.every((item) => item === 0) && (
          <Box sx={{ paddingTop: 3 }}>
            <Bar data={budgetData} options={options} />
          </Box>
        )}
    </Card>
  );
};
