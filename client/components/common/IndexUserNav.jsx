import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleToggleSignupModal: PropTypes.func.isRequired,
  handleToggleSigninModal: PropTypes.func.isRequired,
};

/**
 * User navigation component when not authenticated
 *
 * @param {any} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const IndexUserNav = (props) => {
  const { handleToggleSigninModal, handleToggleSignupModal } = props;
  return (
    <ul id="user-control" className="dropdown-content">
      <li>
        <a
          role="button"
          tabIndex="0"
          className="black-text"
          onClick={handleToggleSigninModal}
        >
          Sign in
          <i className="material-icons left">person</i>
        </a>
      </li>
      <li>
        <a
          role="button"
          tabIndex="0"
          className="black-text"
          onClick={handleToggleSignupModal}
        >
          Register
          <i className="material-icons left">folder</i>
        </a>
      </li>
    </ul>
  );
};

IndexUserNav.propTypes = propTypes;

export default IndexUserNav;
