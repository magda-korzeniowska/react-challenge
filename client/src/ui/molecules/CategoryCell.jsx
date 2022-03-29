import { Box } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';
import { ColorBox } from '../atoms/ColorBox';

export const CategoryCell = ({ color, name, size }) => {
  return (
    <Box display={'flex'} alignItems={'center'} style={{fontSize: size}}>
      {color && <ColorBox color={color} />}
      {name}
    </Box>
  );
};

CategoryCell.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
};
