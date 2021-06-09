import * as actionTypes from './actionTypes';

export const loadData = (payload) => ({type: actionTypes.LOAD_DATA, payload});
export const addNewContact = (payload) => ({type: actionTypes.ADD_NEW_CONTACT, payload});
export const removeContact = (payload) => ({type: actionTypes.REMOVE_CONTACT, payload});
export const editContact = (id, payload) => ({type: actionTypes.EDIT_CONTACT, id, payload});
