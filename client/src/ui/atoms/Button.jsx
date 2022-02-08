import * as React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button as MuiButton } from '@mui/material';
export function Button({ children, startIcon, endIcon, ...props }) {
  return (
    <MuiButton
      {...props}
      startIcon={startIcon && <AddIcon />}
      endIcon={endIcon && <ArrowForwardIosIcon />}
      // disableRipple
    >
      <span style={{ marginRight: `${children.length === 0 ? '0px': endIcon ? '6px' : '0px'}` }}>{children}</span>
    </MuiButton>
  )
};

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  startIcon: PropTypes.bool,
  endIcon: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  disabled: false,
  startIcon: false,
  endIcon: false,
};


