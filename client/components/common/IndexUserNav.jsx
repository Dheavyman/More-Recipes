import React from 'react';
import PropTypes from 'prop-types';

/**
 * User navigation when unathenticated
 *
 * @param {any} props - The properties passed to the component
 * @returns {object} React element
 */
const IndexUserNav = (props) => {
  const { handleOpenSignin, handleOpenSignup } = props;
  return (
    <ul id="user-control" className="dropdown-content">
      <li>
        <a
          role="button"
          tabIndex="0"
          className="black-text"
          onClick={handleOpenSignin}
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
          onClick={handleOpenSignup}
        >
          Register
          <i className="material-icons left">folder</i>
        </a>
      </li>
    </ul>
  );
};

IndexUserNav.propTypes = {
  handleOpenSignup: PropTypes.func.isRequired,
  handleOpenSignin: PropTypes.func.isRequired,
};

export default IndexUserNav;
