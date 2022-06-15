const Controller = require('./Controller');
const User = require('../models/User');
const CustomException = require('../exceptions/CustomException');

class UserController extends Controller {

    async show(id) {
        try {
            const user = await User.findById(id, '-password');
            return user;
        } catch (error) {
            throw new CustomException('usuario nao encontrado', 404);
        }
    }

    async deleteAccount() {

    }
}

module.exports = UserController;