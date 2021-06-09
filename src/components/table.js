import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import contactData from '../db';
import { useSelector, useDispatch } from 'react-redux';
import { loadData, addNewContact, removeContact, editContact } from '../store/actions';
import AddButton from './addButton';
import AddEditModal from './addEditModal';
import ConfirmModal from './confirmModal';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ContactTable = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contactBook);
  const [ state, setState ] = useState({
    isOpenAddModal: false,
    isOpenConfirmModal: false,
    title: '',
  });
  const [newContact, setNewContact] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const cachedContacts = localStorage.getItem('contacts');

    if (!cachedContacts) {
      getContacts();
    }
  }, []);

  const getContacts = async () => {
    try {
      const response = await fetch(contactData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const res = await response.json();
      dispatch(loadData(res));
    } catch (error) {
      console.error(error);
    }
  };

  const createHeader = () => {
    return Object.keys(contacts[0] || {})?.map((item, index) =>
      <TableCell key={index} align="center">{item}</TableCell>);
  };

  const createBodyRows = () => {
    return contacts.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell align="center">{item.name}</TableCell>
          <TableCell align="center">{item.lastname}</TableCell>
          <TableCell align="center">{item.age}</TableCell>
          <TableCell align="center">{item.pager}</TableCell>
          <TableCell align="center" style={{ width: '150px'}}>
            <Button
              startIcon={<EditIcon />}
              title={'edit contact'}
              onClick={() => handleOpenModal('isOpenAddModal', 'Edit Contact', index)}
            />
            <Button startIcon={<DeleteIcon />} title={'edit contact'} onClick={() => openConfirmModal(index)} />
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleOpenModal = (key, title, id) => {
    setState({ ...state, [key]: true, title, contactId: id  });
  };

  const handleCloseModal = (key) => {
    setState({ ...state, [key]: false, contactId: null });
  };

  const createNewContact = (contact) => {
    setNewContact(contact);
  };

  const addContactHandler = () => {
    if (state.title.includes('Add')) {
      dispatch(addNewContact(newContact));
      handleCloseModal('isOpenAddModal');
    } else {
      dispatch(editContact(state.contactId, newContact));
      handleCloseModal('isOpenAddModal');
    }
    setNewContact({});
  };

  const deleteContactHandler = () => {
    dispatch(removeContact(state.contactId));
    handleCloseModal('isOpenConfirmModal');
  };

  const openConfirmModal = (id) => {
    handleOpenModal('isOpenConfirmModal', '', id);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {createHeader()}
            </TableRow>
          </TableHead>
          <TableBody>
            {createBodyRows()}
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton openModal={() => handleOpenModal('isOpenAddModal', 'Add Contact')}/>
      <AddEditModal
        title={state.title}
        isOpen={state.isOpenAddModal}
        contactKeys={Object.keys(contacts[0] || {})}
        handleClose={() => handleCloseModal('isOpenAddModal')}
        handleSubmit={addContactHandler}
        contact={state.contactId >=0 ? contacts[state.contactId] : newContact}
        createNewContact={createNewContact}
      />
      <ConfirmModal
        isOpen={state.isOpenConfirmModal}
        handleClose={() => handleCloseModal('isOpenConfirmModal')}
        handleSubmit={deleteContactHandler}
      />
    </div>
  );
}

export default ContactTable;

