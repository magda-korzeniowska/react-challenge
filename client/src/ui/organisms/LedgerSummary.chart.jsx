import React from 'react';
import { useQuery } from 'react-query';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import { SummaryService } from 'api';
import { ActionHeader, Card, Money } from 'ui';
import { formatCentsToDollars } from 'utils';

export const LedgerSummary = () => {
  Chart.register(ArcElement, Tooltip, Legend);

  const { data: summaryData } = useQuery('summaryData', () =>
    SummaryService.findAll(),
  );

  const data = {
    labels: summaryData?.spending.map((value) => value.categoryName),
    datasets: [
      {
        data: summaryData?.spending.map((value) =>
          formatCentsToDollars(value.amountInCents),
        ),
        backgroundColor: summaryData?.spending.map(
          (value) => value.categoryColor,
        ),
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        usePointStyle: 'star',
        callbacks: {
          label: (context) => context.parsed + ' PLN',
        },
      },
      legend: {
        display: true,
        position: 'left',
        align: 'start',
        labels: {
          usePointStyle: true,
          font: {
            size: 20,
          },
        },
      },
      title: {
        display: true,
        text: 'Test chart',
        position: 'top',
      },
    },
  };

  return (
    <Card
      title={
        <ActionHeader
          variant={'h2'}
          title="Saldo"
          renderActions={() => (
            <Typography variant="h2" align="left">
              <Money inCents={summaryData?.balance} />
            </Typography>
          )}
        />
      }
      subheader="Pozostała kwota"
    >
      <Box sx={{ height: '400px', paddingTop: 3 }}>
        <Doughnut data={data} options={options} />
        {console.log(summaryData)}
      </Box>
    </Card>
  );
};
