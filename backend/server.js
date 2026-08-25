import app from './src/aap.js';
import dotenv from 'dotenv';
import { consctdb } from './src/config/databas.js';
import http from 'http';
import { initsocket } from './src/sockets/server.socket.js';
dotenv.config();

const PORT = process.env.PORT;

consctdb();
const httpserver = http.createServer(app);
initsocket(httpserver);
httpserver.listen(PORT, () => {
  console.log('server started on port', PORT);
});
