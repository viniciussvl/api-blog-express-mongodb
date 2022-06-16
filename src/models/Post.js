const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title: String,
    slug: String,
    content: String,
    status: String,
    approved: Boolean,
    createdAt: Date,
    updatedAt: Date,
    authorId: String,
    categoryId: String
})

module.exports = Post;