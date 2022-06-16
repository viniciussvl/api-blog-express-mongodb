const router = require('express').Router();
const postController = require('../controllers/postController');
const { postValidator } = require('../middlewares/validators/postValidator');
const auth = require('../middlewares/auth');

router.get('/', postController.index);
router.get('/:id', [auth], postController.show);
router.post('/', [auth, postValidator], postController.store);
router.delete('/:id', [auth], postController.destroy);

module.exports = router;