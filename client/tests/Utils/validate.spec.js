import {
  required,
  isEmptyField,
  email,
  alphaNumeric,
  minLength,
  confirmPassword,
  validate,
} from '../../utils/validate';

describe('Validation helpers', () => {
  it('required should validate for required fields', () => {
    let value = '';

    expect(required(value)).toEqual('Required');
    value = 'username';
    expect(required(value)).toEqual(undefined);
  });
  it('isEmptyField should validate for empty field', () => {
    let value = '     ';

    expect(isEmptyField(value)).toEqual('Invalid input');
    value = 'value';
    expect(isEmptyField(value)).toEqual(undefined);
  });
  it('email should validate for valid email address', () => {
    let value = 'example.com';

    expect(email(value)).toEqual('Invalid email address');
    value = 'example@example.com';
    expect(email(value)).toEqual(undefined);
  });
  it('alphaNumeric should validate for alphanumeric values', () => {
    let value = 'abcde12345';

    expect(alphaNumeric(value)).toEqual(undefined);
    value = '133@#fga+_';
    expect(alphaNumeric(value)).toEqual('Only alphanumeric characters');
  });
  it('minLength should validate for minimum length of values', () => {
    const min = 6;
    let value = 'four';

    expect(minLength(min)(value)).toEqual('Must be 6 characters or more');
    value = 'seventeen';

    expect(minLength(min)(value)).toEqual(undefined);
  });
  it('confirmPassword should validate for same password', () => {
    let value = 'password';
    let password = 'not_same_password';

    expect(confirmPassword(value, { password }))
      .toEqual('Passwords do not match');
    value = 'password';
    password = 'password';

    expect(confirmPassword(value, { password })).toEqual(undefined);
  });
  it('validate should validate for input values', () => {
    const values = {};

    values.firstName = '';
    expect(validate(values).firstName).toEqual('Required');
    values.firstName = '      ';
    expect(validate(values).firstName).toEqual('Invalid input');

    values.lastName = '';
    expect(validate(values).lastName).toEqual('Required');
    values.lastName = '      ';
    expect(validate(values).lastName).toEqual('Invalid input');

    values.username = '';
    expect(validate(values).username).toEqual('Required');
    values.username = '      ';
    expect(validate(values).username).toEqual('Invalid input');
    values.username = 'asdf1234@#$';
    expect(validate(values).username).toEqual('Only alphanumeric characters');
    values.username = 'five';
    expect(validate(values).username).toEqual('Must be 6 characters or more');

    values.email = '';
    expect(validate(values).email).toEqual('Required');
    values.email = 'example.com';
    expect(validate(values).email).toEqual('Invalid email address');

    values.password = '';
    expect(validate(values).password).toEqual('Required');
    values.password = 'four';
    expect(validate(values).password).toEqual('Must be 6 characters or more');

    values.retypePassword = '';
    expect(validate(values).retypePassword).toEqual('Required');
    values.password = 'password';
    values.retypePassword = 'not_same_password';
    expect(validate(values).retypePassword).toEqual('Passwords do not match');
  });
});
