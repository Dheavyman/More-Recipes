import jwt from 'jsonwebtoken';

const getToken = () => (
  localStorage.getItem('token')
);

const decodeToken = () => (
  jwt.decode(getToken())
);

export { getToken, decodeToken };
