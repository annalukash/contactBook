import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const FieldWrapper = styled.div`
  width: 300px;
  margin: 10px 0;

  .MuiFormControl-root {
    width: 100%;
  }
`;

const Form = ({ contactKeys, contact, createNewContact }) => {
  const [ state, setState ] = useState(contact);

  const onChangeValue = (key, value) => {
    setState({ ...state, [key]: value});
  };

  return (
    <form>
      {contactKeys?.map((item, index) =>
        <FieldWrapper key={index}>
          <TextField
            value={state[item] || ''}
            onChange={(event) => onChangeValue(item, event.target.value)}
            type={item === 'age' || item === 'pager' ? 'number' : 'default'}
            id="standard-basic"
            label={item}
            onBlur={(event) => createNewContact(state)}
          />
        </FieldWrapper>
      )}
    </form>
  )
};

export default Form;
