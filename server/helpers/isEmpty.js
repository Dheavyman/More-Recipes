const isEmpty = (str) => {
  const regexp = /^[ ]+$/;
  if (regexp.test(str) || !str.length) {
    return true;
  }
  return false;
};

export default isEmpty;
