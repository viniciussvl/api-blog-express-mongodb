const User = require('../models/User');

const show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password');
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    show
};