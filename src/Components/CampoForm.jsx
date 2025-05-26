import React from 'react';
import Label from './Label';
import Input from './Input';
import styled from 'styled-components';

const StyledCampoForm = styled.div`
  display: flex;
  flex-direction: column;
`

const CampoForm = ({ id, label, inputValue, setValue, erro, ...props }) => {
  return (
    <StyledCampoForm>
      <Label id={id}>{label}</Label>
      <Input
        id={id}
        inputValue={inputValue}
        setValue={setValue}
        {...props}
        erro={erro}
      ></Input>
    </StyledCampoForm>
  );
};

export default CampoForm;
