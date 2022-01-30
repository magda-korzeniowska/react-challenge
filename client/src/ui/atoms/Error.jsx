import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

import {theme} from "../../theme";
import errorImg from '../../assets/unknown_error.png';

export const Error = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
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
                color: theme.palette.grey.level4,
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