const router = require('express').Router();

const { loginValidator } = require('../middlewares/validators/loginValidator');
const { registerValidator } = require('../middlewares/validators/registerValidator');

const authController = require('../controllers/AuthController');

router.post('/login', loginValidator, authController.login);
router.post('/register', registerValidator, authController.register)

module.exports = router;