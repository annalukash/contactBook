import React from 'react';
import { Dialog, DialogActions,DialogTitle, Button } from '@material-ui/core'


const ConfirmModal = ({ isOpen, handleClose, handleSubmit }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Are you sure you want to delete contact?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default ConfirmModal;
