import React from 'react';
import { Grid } from '@mui/material';
import { BudgetSummary, LedgerWidget, LedgerSummary, Page } from 'ui';

export const WalletPage = () => (
  <Page title={'Portfel'}>
    <Grid container spacing={{ xs: 3, md: 6 }}>
      <Grid item xs={12} md={8} order={{ xs: 2, md: 2 }}>
        <LedgerWidget />
      </Grid>
      <Grid container item xs={12} md={4} spacing={3} order={{ xs: 1, md: 1 }}>
        <Grid item xs={12} data-test-id={'wallet-top-sidebar'}>
          <LedgerSummary />
        </Grid>
        <Grid item xs={12} data-test-id={'wallet-bottom-sidebar'}>
          <BudgetSummary />
        </Grid>
      </Grid>
    </Grid>
  </Page>
);
