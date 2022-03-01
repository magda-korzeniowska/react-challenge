import React from 'react';
import * as PropTypes from 'prop-types';
import MuiModal from '@mui/material/Modal';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { Button, Card } from 'ui';

export const Modal = ({
  title,
  description,
  handleClose,
  children,
  isOpen,
  saveBtnDisabled,
}) => {
  return (
    <MuiModal open={isOpen} onClose={handleClose}>
      <>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            boxShadow: 24,
          }}
          title={title}
          subheader={description}
          variant={{ variant: 'h4' }}
        >
          <CardContent>{children}</CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '40px',
              padding: '0px',
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Anuluj
            </Button>
            <Button
              variant="contained"
              onSubmit={null}
              disabled={saveBtnDisabled}
            >
              Zapisz
            </Button>
          </CardActions>
        </Card>
      </>
    </MuiModal>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  handleClose: PropTypes.func,
  isOpen: PropTypes.bool,
  saveBtnDisabled: PropTypes.bool,
};
