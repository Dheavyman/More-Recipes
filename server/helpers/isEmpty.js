/**
 * Check if the argument passed is empty
 *
 * @param {string} str - The arguement to be validated
 * @returns {boolean} true or false
 */
const isEmpty = (str) => {
  const regexp = /^[ ]+$/;
  return (regexp.test(str) || !str.length);
};

export default isEmpty;
