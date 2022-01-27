import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

import noContentImg from '../../assets/no_content.png';

export const NoContent = () => {
  return (
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
  );
};
