const router = require('express').Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.get('/:id', auth, userController.show);

module.exports = router;