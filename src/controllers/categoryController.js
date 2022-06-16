const Category = require('../models/Category');

const index = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }   
}

const show = async (req, res) => {
    const id = req.params.id;

    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const store = async (req, res) => {
    const name = req.body.name;
    const userId = req.userId;
    try {
        const category = new Category({
            name,
            createdBy: userId
        })

        await category.save();
        res.status(201).json({message: 'Category created successfully'});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}

const destroy = async (req, res) => {

}

const update = async (req, res) => {

}

module.exports = {
    index,
    show,
    store, 
    destroy,
    update
}