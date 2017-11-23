import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();

// Setup the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable cross origin for XMLHttpRequest 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Require our routes
routes(app);

// Catch other routes that doesn't exist
app.all('*', (req, res) => res.status(404).send({
  message: 'Oops! 404. Page not Found',
}));

// Set the app entry port
app.set('port', process.env.PORT || 3000);

// app.listen(port);
app.listen(app.get('port'));

export default app;
