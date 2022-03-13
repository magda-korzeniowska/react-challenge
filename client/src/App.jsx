import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Router from './pages/routing';
import { theme } from 'theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
