const express = require('express');
const app = express();
const authRoutes = require('../routes/authRoutes');
const usersRoutes = require('../routes/usersRoutes');
const postsRoutes = require('../routes/postsRoutes');
const categoriesRoutes = require('../routes/categoriesRoutes');

const createServer = () => {
    app.use(express.json());

    app.use('/auth', authRoutes);
    app.use('/users', usersRoutes);
    app.use('/posts', postsRoutes);
    app.use('/categories', categoriesRoutes);
    
    return app;
}

module.exports = {
    createServer
}