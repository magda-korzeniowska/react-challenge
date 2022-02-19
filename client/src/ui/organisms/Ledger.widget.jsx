import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { ActionHeader, Button, Card } from 'ui';


export const LedgerWidget = () => {
  return (
    <Card
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={() => (<>
            <Button variant="outlined" startIcon={<AddIcon />}>
              Wpłać
            </Button>
            <Button variant="outlined" startIcon={<RemoveIcon />}>
            Wypłać
          </Button></>
          )}
        />
      }
    />
  );
};
