import React from 'react';
import * as PropTypes from 'prop-types';
import { CardActions, CardContent, Modal as MuiModal } from '@mui/material';
import { Button, Card } from 'ui';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  boxShadow: 24,
};

export const Modal = ({
  title,
  description,
  handleClose,
  children,
  isOpen,
  isSaveBtnDisabled,
  onSubmit,
}) => {
  return (
    <MuiModal open={isOpen} onClose={handleClose}>
      <>
        <Card
          sx={style}
          title={title}
          subheader={description}
          variant={{ variant: 'h4' }}
        >
          <CardContent sx={{ mt: 2, mb: 2 }}>{children}</CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 4,
              padding: 0,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ marginRight: 1 }}
            >
              Anuluj
            </Button>
            <Button onClick={onSubmit} disabled={isSaveBtnDisabled}>
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
  isSaveBtnDisabled: PropTypes.bool,
};
