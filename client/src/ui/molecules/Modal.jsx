import React from 'react';
import MuiModal from '@mui/material/Modal';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { Button, Card } from 'ui';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const Modal = ({
  description,
  handleClose,
  children,
  isOpen,
  disabled,
}) => {
  return (
    <MuiModal open={isOpen} onClose={handleClose}>
      <>
        <Card style={style} title={description}>
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
            <Button variant="contained" onSubmit={null}>
              Zapisz
            </Button>
          </CardActions>
        </Card>
      </>
    </MuiModal>
  );
};
