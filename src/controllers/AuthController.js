const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**Validates the user's email and password 
 * to create an authentication token
 * 
 * @param {Object} req Required request object 
 * @param {Object} res Required response object
 * @returns 
 * The response object with the status and authentication token,
 */
const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email: email })
        if(!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            res.status(401).json({ error: 'Incorrect password' });
            return;
        }

        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        )

        res.status(200).json({ message: 'Successfully logged in', token: token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}

/** Create a new user in the database and generate a hash with salt
 * 
 * @param {Object} req Required request object
 * @param {Object} res Required response object
 * @returns A success message if you were able to create the user
 */
const register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: passwordHash });
        await user.save();

        res.status(201).json({message: 'Usuario cadastrado com sucesso'});
    } catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    login,
    register
}