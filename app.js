require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

// routes
const auth = require('./src/routes/auth');
app.use('/auth', auth);

const user = require('./src/routes/users');
app.use('/users', user);


app.get('/', (req, res) => {
    res.status(200).json({message: 'funcionando'});
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbName}.knwqpw3.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('conectado ao banco de dados');
})
.catch((error) => {
    console.log(error);
})

app.listen(3000);