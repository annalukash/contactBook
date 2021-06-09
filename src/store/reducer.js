import * as actionTypes from './actionTypes';

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) || []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_DATA:
      localStorage.setItem('contacts', JSON.stringify(action.payload))
      return {
        ...state, contacts: action.payload
      }
    case actionTypes.ADD_NEW_CONTACT:
      const newContacts = [...state.contacts, action.payload];
      localStorage.setItem('contacts', JSON.stringify(newContacts))
      return {
        ...state, contacts: newContacts
      }
    case actionTypes.REMOVE_CONTACT:
      const filteredContactList = state.contacts.filter((item, index) => index !== action.payload);
      localStorage.setItem('contacts', JSON.stringify(filteredContactList))
      return {
        ...state, contacts: filteredContactList
      }
    case actionTypes.EDIT_CONTACT:
      const newContactList = state.contacts.map((item, index) => {
        if (index === action.id) {
          item = action.payload;
          return item;
        }
        return item;
      });
      localStorage.setItem('contacts', JSON.stringify(newContactList))
      return {
        ...state, contacts: newContactList
      }
    default:
      return state;
  }
}

export default reducer;
