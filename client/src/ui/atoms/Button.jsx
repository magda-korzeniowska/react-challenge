import * as React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';
export function Button({ children, ...props }) {
  return <MuiButton {...props}>{children}</MuiButton>;
}

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  disabled: false,
};
