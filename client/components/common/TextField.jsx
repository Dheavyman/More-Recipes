import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const { id, name, type, defaultValue, placeholder, className,
    required, disabled, onChange } = props;

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
        />
      </div>
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  defaultValue: undefined,
  className: undefined,
  required: undefined,
  disabled: undefined,
};

export default TextField;
