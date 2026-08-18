import app from './src/aap.js';
import dotenv from 'dotenv';
import { consctdb } from './src/config/databas.js';
import http from 'http';
import { initsocket } from './src/sockets/server.socket.js';
dotenv.config();
consctdb();
const httpserver = http.createServer(app);
const PORT = process.env.PORT;
initsocket(httpserver);
httpserver.listen(PORT, () => {
  console.log('server started on port', PORT);
});
