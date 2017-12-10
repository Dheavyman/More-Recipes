import jwt from 'jsonwebtoken';

const token = localStorage.getItem('token');

const decoded = jwt.decode(token);

export { token, decoded };
