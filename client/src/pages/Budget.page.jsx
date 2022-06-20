import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';

import {
  ActionHeader,
  AddNewBudgetRecord,
  BudgetTableWidget,
  Button,
  Card,
  Page,
} from 'ui';

export const BudgetPage = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój budżet"
            renderActions={() => (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
            <BudgetTableWidget />
            <AddNewBudgetRecord
              isOpen={isOpen}
              onClose={() => setOpen(false)}
            />
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
