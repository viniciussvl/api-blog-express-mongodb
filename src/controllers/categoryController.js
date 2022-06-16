const Category = require('../models/Category');

const index = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories: categories })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }   
}

const show = async (req, res) => {

}

const store = async (req, res) => {

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