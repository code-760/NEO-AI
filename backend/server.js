import app from './src/aap.js';
import dotenv from 'dotenv';
import { consctdb } from './src/config/databas.js';
const PORT = process.env.PORT;
consctdb();
app.listen(PORT, () => {
  console.log('servae setart');
});
