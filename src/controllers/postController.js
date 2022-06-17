const Post = require('../models/Post');
const slugify = require('../helpers/slugify');

const index = async (req, res) => {
    try {
        const posts = await Post.find({ status: true }).sort({ createdAt: 'desc' }).exec();
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

const show = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await Post.findById(id);
        if(!post) {
            res.status(404).json({ message: 'Post not found' })
            return;
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: 'Post not found' })
    }
}

const store = async (req, res) => {
    const {title, content, status, categoryId} = req.body;
    try {
        const slug = slugify(title);
        const authorId = req.userId;
        const post = new Post({
            title, 
            slug,
            content,
            status,
            categoryId,
            authorId
        })

        await post.save();
        res.status(201).json({ message: 'Post created', id: post._id })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

const destroy = async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;

    try {
        const postExists = await Post.findOne({ _id: id, authorId: userId });
        if(!postExists) {
            res.status(404).json({ message: 'Post not found' })
            return;
        }

        const postDeleted = await Post.deleteOne({_id: id});
        if(postDeleted.deletedCount > 0) {
            res.status(200).json({ message: 'Post deleted successfully' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    const {title, content, categoryId, status} = req.body;
    const slug = slugify(title);
    const userId = req.userId;

    try {
        const postExists = await Post.findOne({ _id: id, authorId: userId  });
        if(!postExists) {
            res.status(404).json({ message: 'Post not found' });
            return;
        } 

        const postUpdated = await Post.updateOne({ _id: id }, {
            title,
            slug,
            content,
            categoryId,
            status,
        })

        if(postUpdated.matchedCount > 0) {
            res.status(201).json({ message: 'Post updated successfully' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    show,
    index,
    store,
    update,
    destroy
}