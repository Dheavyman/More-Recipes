import apiVersion1 from './version1';

export default (app) => {
  app.use('/api/v1', apiVersion1);
};
