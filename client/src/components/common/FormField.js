import React from 'react'
import PropTypes from 'prop-types';
import { Form, Label, } from 'semantic-ui-react';

const FormField = ({
  name,
  placeholder,
  value,
  label,
  onChange,
  disabled,
  error,
  type,
}) => (
  <Form.Field>
    <label>{label}</label>
    <input placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
    {
      error &&
        <Label basic color='red' pointing style={{ backgroundColor: 'white' }}>
          {error}
        </Label>
    }
  </Form.Field>
)

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string,
}

FormField.defaultProps = {
  type: 'text',
}

export default FormField;