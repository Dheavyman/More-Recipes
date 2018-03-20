import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.string,
};

const defaultProps = {
  defaultValue: undefined,
  className: undefined,
  required: undefined,
  disabled: undefined,
  maxLength: undefined,
};

/**
 * Text field component
 *
 * @param {object} props - The properties passed to the function
 *
 * @returns {object} React element
 */
const TextField = (props) => {
  const { id, name, type, defaultValue, placeholder, className,
    required, disabled, onChange, maxLength } = props;

  return (
    <div className="row">
      <label htmlFor={name} className="col s3 black-text">
        {id}:
      </label>
      <div className="col s9">
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={className}
          required={required}
          disabled={disabled}
          onChange={onChange}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};

TextField.propTypes = propTypes;

TextField.defaultProps = defaultProps;

export default TextField;
