import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import {
  ActionHeader,
  AddNewLedgerRecord,
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
import { LedgerService } from 'api';

export const LedgerWidget = () => {
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState('');

  const handleOpenModal = (modalType) => {
    setOpen(true);
    setType(modalType);
  };

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
        <CategoryCell color={row.category?.color} name={row.category?.name} />
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
        <Box
          sx={{
            display: 'flex',
            color: row.mode === 'INCOME' ? 'success.main' : 'error.main',
          }}
        >
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
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleOpenModal('INCOME')}
              >
                Wpłać
              </Button>
              <Button
                variant="outlined"
                startIcon={<RemoveIcon />}
                onClick={() => handleOpenModal('EXPENSES')}
              >
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
      <AddNewLedgerRecord
        type={type}
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
      />
    </Card>
  );
};
