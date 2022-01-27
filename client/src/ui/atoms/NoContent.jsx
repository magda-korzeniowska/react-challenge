import React from 'react';
import { Box, CardMedia, ThemeProvider, Typography } from '@mui/material';

import { theme } from '../../theme';
import noContentImg from '../../assets/no_content.png';

export const NoContent = () => {
  return (
    <ThemeProvider theme={theme} >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 202 }}
          src={noContentImg}
          alt='Brak danych do wyświetlenia'
        />
        <Typography
          variant='body1'
          sx={{
            color: 'rgba(51, 51, 51, 0.5)',
          }}
        >
          Brak danych do wyświetlenia
        </Typography>
      </Box>
    </ThemeProvider>

  );
};
