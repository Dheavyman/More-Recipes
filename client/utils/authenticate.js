import jwt from 'jsonwebtoken';

/**
 * Function to get the token
 *
 * @returns {any} Store token in local storage
 */
const getToken = () => (
  localStorage.getItem('token')
);

/**
 * Function to decode token
 *
 * @returns {any} Decoded user details
 */
const decodeToken = () => (
  jwt.decode(getToken())
);

export { getToken, decodeToken };
