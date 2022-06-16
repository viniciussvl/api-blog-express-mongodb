const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    createdAt: Date,
    updatedAt: Date
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;