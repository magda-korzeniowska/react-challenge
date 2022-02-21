import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
  Table,
} from 'ui';
import { Box } from '@mui/material';
import { LedgerService } from 'api';

export const LedgerWidget = () => {

  const queryClient = useQueryClient();

  const { isLoading, isFetching, isError, data } = useQuery('ledgerData', () =>
    LedgerService.findAll(),
  );

  const deleteData = (ids) => {
    return LedgerService.remove({ ids });
  };

  const { mutate } = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries('ledgerData');
    },
  });

  const headCells = [
    {
      id: 'name',
      label: 'Nazwa',
      renderCell: (row) => row.title,
    },
    {
      id: 'category',
      label: 'Kategoria',
      renderCell: (row) => (
        <CategoryCell
          color={row.category?.color}
          name={row.mode !== 'INCOME' ? row.category?.name : 'Wpływ'}
        />
      ),
    },
    {
      id: 'date',
      label: 'Data',
      renderCell: (row) => <LocalizedDate date={row.createdAt} />,
    },
    {
      id: 'amount',
      label: 'Kwota',
      renderCell: (row) => (
        <Box sx={{ display: 'flex', color: row.mode === 'INCOME' ? 'green' : 'red', }}>
          {row.mode === 'INCOME' ? '+' : '-'}
          <Money inCents={row.amountInCents} />
        </Box>
      ),
    },
  ];

  return (
    <Card
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={() => (
            <Box
              sx={{
                width: '200px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button variant="outlined" startIcon={<AddIcon />}>
                Wpłać
              </Button>
              <Button variant="outlined" startIcon={<RemoveIcon />}>
                Wypłać
              </Button>
            </Box>
          )}
        />
      }
    >
      {(isLoading || isFetching) && <Loader />}
      {isError && <Error />}
      {data?.length === 0 && <NoContent />}

      {data && data.length > 0 && (
        <Table
          headCells={headCells}
          rows={data}
          getUniqueId={(element) => element.id}
          deleteRecords={(ids) => mutate(ids)}
        />
      )}
    </Card>
  );
};
