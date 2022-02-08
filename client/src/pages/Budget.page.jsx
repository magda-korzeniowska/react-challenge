import React from 'react';

import { ActionHeader, Button, Card, Page } from 'ui';
import { Grid } from '@mui/material';

export const BudgetPage = () => {

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój budżet"
            renderActions={() => (
              <Button
                variant='contained'
                color='primary'
                size='medium'
                disabled={false}
                startIcon={false}
                endIcon={false}
                onClick={() => console.log('click')}
              >Zdefiniuj budżet</Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
      </Card>
    </Page>
  );
};
