import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

import errorImg from '../../assets/unknown_error.png';

export const Error = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {
        error?.message?.includes('Network Error') ? (
          <Typography>Uruchom Server!</Typography>
        ) : (
          <Box>
            <CardMedia
              component="img"
              sx={{ width: 248 }}
              src={errorImg}
              alt='Wystąpił nieoczekiwany błąd'
            />
            <Typography
              variant='body1'
              sx={{
                color: 'rgba(51, 51, 51, 0.5)',
              }}
            >
              Wystąpił nieoczekiwany błąd
            </Typography>
          </Box>
        )
      }
    </Box>
  );
};
