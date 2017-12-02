import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const { message } = props;
  return (
    <div className="red-text center-align">
      {message}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
