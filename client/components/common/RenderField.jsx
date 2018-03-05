import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

/**
 * Input field component
 *
 * @param {object} Field - The input field
 * @param {object} Field.input - The input field element
 * @param {string} Field.label - The input field label
 * @param {string} Field.type - The input field type
 * @param {object} Field.meta
 * @param {boolean} Field.meta.touched - The field input state
 * @param {string} Field.meta.error - Validation error message
 *
 * @returns {object} Input element
 */
const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <br />
    <div>
      <input
        {...input}
        type={type}
        placeholder={label}
      />
      {touched && (error && <span className="red-text">{error}</span>)}
    </div>
  </div>
);

RenderField.propTypes = propTypes;

export default RenderField;
