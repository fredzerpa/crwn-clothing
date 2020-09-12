import React from 'react';
import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
} from './FormInput.styles.jsx';

const FormInput = ({ handleChange, label, ...otherFormProps }) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} {...otherFormProps} />
    {label ? (
      <FormInputLabel className={otherFormProps.value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
