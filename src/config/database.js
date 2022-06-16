require('dotenv').config();

const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const start = function() {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbName}.knwqpw3.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((error) => {
        console.log(error);
    })
}

module.exports = {
    start
}