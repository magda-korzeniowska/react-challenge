import React from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  LinearScale,
  Tooltip,
  CategoryScale,
  BarElement,
} from 'chart.js';

import { ActionHeader, Card } from 'ui';
import { BudgetService } from 'api';

export const BudgetSummary = () => {
  Chart.register(CategoryScale, LinearScale, Tooltip, BarElement);

  const { data: budgetData } = useQuery(
    'budgetData',
    () => BudgetService.findAll(),
    {
      select: (data) => {
        return {
          labels: data?.map((value) => value.category.name),
          currentSpendingPercent: data?.map(
            (value) => value.currentSpendingPercent,
          ),
          colors: data?.map((value) => value.category.color),
        };
      },
    },
  );

  const data = {
    labels: budgetData?.labels.map((label) => `${label} %`),
    datasets: [
      {
        data: budgetData?.currentSpendingPercent,
        backgroundColor: budgetData?.colors,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
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
    <Box>
      <Card
        title={<ActionHeader variant={'h4'} title="Budżet" />}
        subheader="Podsumowanie wydatków"
      >
        {budgetData?.labels.length === 0 ||
        budgetData?.currentSpendingPercent.every((item) => item === 0) ? (
          <Typography variant={'h5'} marginTop={4} align={'center'}>
            Brak wyników
          </Typography>
        ) : (
          <Box sx={{ paddingTop: 3 }}>
            <Bar data={data} options={options} />
          </Box>
        )}
      </Card>
    </Box>
  );
};
