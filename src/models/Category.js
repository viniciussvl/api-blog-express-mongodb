const mongoose = require('mongoose');

const Category = mongoose.model({
    name: String,
    slug: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = Category;