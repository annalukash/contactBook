import React from 'react';
import Form from './form';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@material-ui/core';

const AddEditModal = ({ handleClose, isOpen, title, handleSubmit, contactKeys, contact, createNewContact }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Form contactKeys={contactKeys} contact={contact} createNewContact={createNewContact} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEditModal;
