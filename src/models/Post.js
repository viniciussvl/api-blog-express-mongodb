const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
{
    title: String,
    slug: String,
    content: String,
    status: String,
    approved: Boolean,
    authorId: String,
    categoryId: String
},
{ timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post;