const Controller = require('./Controller');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomException = require('../exceptions/CustomException');

class AuthController extends Controller {

    async register(name, email, password) {
        const userExists = await User.findOne({ email: email });
        if(userExists) {
            throw new CustomException('Usuário já existe.', 404);
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        try {
            const user = new User({ name, email, password: passwordHash });
            await user.save();
        } catch(error) {
            console.log(error);
            throw new CustomException('nao foi possivel criar usuario');
        }
    }

    async login(email, password) {
        const user = await User.findOne({ email: email })
        if(!user) {
            throw new CustomException('usuario nao encontrado', 404);
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            throw new CustomException('Senha incorreta', 401);
        }

        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        )

        return token;
    }

}

module.exports = AuthController;