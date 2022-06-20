import React from 'react';
import * as PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export const ActionHeader = ({
  title,
  variant,
  renderActions = () => null,
}) => {
  return (
    <Box
      spacing={{
        xs: 3,
        md: 0,
      }}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <Typography
        component={variant}
        variant={variant}
        marginBottom={3}
        display={'flex-inline'}
      >
        {title}
      </Typography>
      {renderActions()}
    </Box>
  );
};

ActionHeader.propTypes = {
  title: PropTypes.any,
  actions: PropTypes.any,
};

ActionHeader.defaultProps = {
  variant: 'h3',
};
