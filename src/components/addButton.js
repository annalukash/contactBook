import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px;
`;

const AddButton = ({ openModal }) => {
  return (
    <Wrapper>
      <Button variant="outlined" color="primary" onClick={openModal}>Add new contact</Button>
    </Wrapper>
  )
};

export default AddButton;
