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

  // const transformData = (data) => {
  //   const balance = data?.balance;
  //   const labels = data?.spending.map((value) => value.categoryName);
  //   const amounts = data?.spending.map((value) => value.amountInCents);
  //   const colors = data?.spending.map((value) => value.categoryColor);
  //   return [balance, labels, amounts, colors]
  // }

  // const [balance, labels, amounts, colors] = transformData()

  const { data: summaryData } = useQuery(
    'summaryData',
    () => SummaryService.findAll(),
    // {
    //   select: transformData
    // },
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
        position: 'bottom',
        align: 'start',
        labels: {
          usePointStyle: true,
          font: {
            size: 16,
          },
        },
      },
      // legendDistance: {
      //   padding: 20,
      // },
    },
  };

  // const plugins = [
  //   {
  //     id: 'legendDistance',
  //     beforeInit(chart, args, opts) {
  //       // Get reference to the original fit function
  //       const originalFit = chart.legend.fit;
  //       // Override the fit function
  //       chart.legend.fit = function fit() {
  //         // Call original function and bind scope in order to use `this` correctly inside it
  //         originalFit.bind(chart.legend)();
  //         // Specify what you want to change, whether the height or width
  //         this.height += opts.padding || 0;
  //       };
  //     },
  //   },
  // ];

  return (
    <Box>
      {summaryData?.spending.length === 0 && <Card title="Brak wyników" />}
      {summaryData?.spending.length > 0 && (
        <Card
          sx={{ minWidth: '30vw', width: '100%' }}
          title={
            <ActionHeader
              variant={'h4'}
              title="Saldo"
              renderActions={() => (
                <Typography variant="h4" align="left">
                  <Money inCents={summaryData?.balance} />
                </Typography>
              )}
            />
          }
          subheader="Pozostała kwota"
        >
          <Box sx={{ height: '350px', paddingTop: 3 }}>
            <Doughnut data={data} options={options} />
          </Box>
        </Card>
      )}
    </Box>
  );
};
