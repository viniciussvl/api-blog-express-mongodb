
const express = require('express');
const database = require('./src/config/database');
const app = express();
app.use(express.json());

database.start();

// Routes
const authRoutes = require('./src/routes/authRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const postsRoutes = require('./src/routes/postsRoutes');
const categoriesRoutes = require('./src/routes/categoriesRoutes');

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/categories', categoriesRoutes);


app.listen(3000);