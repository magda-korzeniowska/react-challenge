import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

import { theme } from '../../theme';
import noContentImg from 'assets/no_content.png';

export const NoContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '600px',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 202 }}
        src={noContentImg}
        alt=""
      />
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.grey.level4,
        }}
      >
        Brak danych do wyświetlenia
      </Typography>
    </Box>
  );
};
