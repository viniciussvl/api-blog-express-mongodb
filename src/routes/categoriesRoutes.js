const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');
const { categoryValidator } = require('../middlewares/validators/categoryValidator');

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.post('/', [auth, categoryValidator], categoryController.store);
router.delete('/:id', [auth], categoryController.destroy);
router.put('/:id', [auth], categoryController.update);

module.exports = router;