/**
 * Check if input parameter is alphanumeric
 *
 * @param {string} username - The username field
 * @returns {boolean} True if alphanumeric or false if not
 */
const isAlphaNumeric = (username) => {
  const regexp = /^[A-Za-z0-9]+$/;
  return (regexp.test(username));
};

export default isAlphaNumeric;
