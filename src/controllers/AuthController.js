const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        try {
            const user = new User({ name, email, password: passwordHash });
            await user.save();
        } catch(error) {
            console.log(error);
            throw new CustomException('nao foi possivel criar usuario');
        }

        res.status(201).json({message: 'Usuario cadastrado com sucesso'});
    } catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    login,
    register
}