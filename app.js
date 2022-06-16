require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const postsRoutes = require('./src/routes/postsRoutes');

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

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