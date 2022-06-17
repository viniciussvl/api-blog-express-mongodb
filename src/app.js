require('dotenv').config();

const database = require('./config/database');
const server = require('./config/server');

const app = server.createServer();
app.listen(3000, async () => {
    console.log('API is runinng at http://localhost:3000')
});

database.connect();
