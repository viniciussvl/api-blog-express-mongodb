const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.post('/', [auth], categoryController.store);
router.delete('/:id', [auth], categoryController.destroy);
router.put('/:id', [auth], categoryController.update);

module.exports = router;