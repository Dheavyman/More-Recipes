const required = value => (value.trim() ? undefined : 'Required');

const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
);

const alphaNumeric = value => (
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
);

const minLength = min => value => (
  value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined
);

const confirmPassword = (value, { password }) => (
  value !== password
    ? 'Passwords do not match'
    : undefined
);

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.username) {
    errors.username = 'Required';
  } else if (/[^a-zA-Z0-9 ]/i.test(values.username)) {
    errors.username = 'Only alphanumeric characters';
  } else if (values.username.length < 8) {
    errors.username = 'Must be 8 characters or more';
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

export { required, email, alphaNumeric, minLength, confirmPassword, validate };
