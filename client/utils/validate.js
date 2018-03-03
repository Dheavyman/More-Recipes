/**
 * Check for required fields
 *
 * @param {string} value - Field value
 *
 * @returns {any} Message or undefined
 */
const required = value => (value ? undefined : 'Required');

/**
 * Check if field is empty
 *
 * @param {string} value - Field value
 *
 * @returns {any} Error message or undefined
 */
const isEmptyField = value => (
  !/^\s*$/.test(value) ? undefined : 'Invalid input'
);

/**
 * Check email format
 *
 * @param {string} value - Field value
 *
 * @returns {any} Error message or undefined
 */
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
);

/**
 * Check alpha-numeric format
 *
 * @param {string} value - Field value
 *
 * @returns {any} Error message or undefined
 */
const alphaNumeric = value => (
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
);

/**
 * Check minimum length of value
 *
 * @param {number} min - Length to check against
 *
 * @returns {any} Error message or undefined
 */
const minLength = min => value => (
  value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined
);

/**
 * Confirm password
 *
 * @param {string} value - Field value
 * @param {string} { password } - Password value
 *
 * @returns {any} Error message or undefined
 */
const confirmPassword = (value, { password }) => (
  value !== password
    ? 'Passwords do not match'
    : undefined
);

/**
 * Validate input values
 *
 * @param {string} values - Field values
 *
 * @returns {object} Error message(s)
 */
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.trim() === '') {
    errors.firstName = 'Invalid input';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.trim() === '') {
    errors.lastName = 'Invalid input';
  }
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.trim() === '') {
    errors.username = 'Invalid input';
  } else if (/[^a-zA-Z0-9 ]/i.test(values.username)) {
    errors.username = 'Only alphanumeric characters';
  } else if (values.username.length < 6) {
    errors.username = 'Must be 6 characters or more';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more';
  }
  if (!values.retypePassword) {
    errors.retypePassword = 'Required';
  } else if (values.retypePassword !== values.password) {
    errors.retypePassword = 'Passwords do not match';
  }
  return errors;
};

export { required, isEmptyField, email, alphaNumeric, minLength,
  confirmPassword, validate };
