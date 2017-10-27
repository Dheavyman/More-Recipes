// This is the application entry.
import http from 'http';
import app from '../app';

// Set the app entry port
app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);
// server.listen(port);
server.listen(app.get('port'));
