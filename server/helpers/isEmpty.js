const isEmpty = (str) => {
  const regexp = /^[ ]+$/;
  if (str.match(regexp) || !str.length) {
    return true;
  }
  return false;
};

export default isEmpty;
