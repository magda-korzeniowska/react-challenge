import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';

import { SummaryService } from 'api';
import { ActionHeader, Card, CategoryCell, Error, Loader, Money } from 'ui';
import { formatCentsToDollars } from 'utils';

export const LedgerSummary = () => {
  Chart.register(ArcElement, Tooltip, Legend);

  const {
    data: summaryData,
    isLoading,
    isError,
    error,
  } = useQuery('summaryData', () => SummaryService.findAll(), {
    select: useCallback((response) => {
      return {
        balance: response?.balance,
        labels: response?.spending.map(({ categoryName }) => categoryName),
        amounts: response?.spending.map(({ amountInCents }) =>
          formatCentsToDollars(amountInCents),
        ),
        colors: response?.spending.map(({ categoryColor }) => categoryColor),
      };
    }, []),
  });

  const data = {
    labels: summaryData?.labels,
    datasets: [
      {
        data: summaryData?.amounts,
        backgroundColor: summaryData?.colors,
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
        display: false,
      },
    },
  };

  return (
    <Card
      title={
        <ActionHeader
          variant={'h4'}
          title="Saldo"
          renderActions={() => (
            <Typography variant="h3" align="left">
              <Money inCents={summaryData?.balance} />
            </Typography>
          )}
        />
      }
      subheader="Pozostała kwota"
    >
      {isLoading && <Loader />}
      {!isLoading && isError && <Error error={error} />}
      {!isLoading && !isError && summaryData?.labels.length === 0 && (
        <Typography variant={'h5'} marginTop={4} align={'center'}>
          Brak wyników
        </Typography>
      )}
      {!isLoading && !isError && summaryData?.labels.length !== 0 && (
        <Box sx={{ height: '250px', paddingTop: 3, paddingBottom: 3 }}>
          <Doughnut data={data} options={options} />
        </Box>
      )}
      <Box>
        {summaryData?.colors.map((item, index) => (
          <CategoryCell
            key={`legend-${index}`}
            size={'13px'}
            color={item}
            name={summaryData?.labels[index]}
          />
        ))}
      </Box>
    </Card>
  );
};
