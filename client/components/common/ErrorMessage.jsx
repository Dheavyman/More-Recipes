import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error message component
 *
 * @param {object} props - The properties passed to the function
 *
 * @returns {object} React element
 */
const ErrorMessage = (props) => {
  const { message } = props;

  return (
    <div className="red-text center-align">
      {message.include('jwt')
        ? 'Please login to continue'
        : message
      }
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
