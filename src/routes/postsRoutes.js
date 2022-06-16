const router = require('express').Router();
const postController = require('../controllers/postController');
const { postValidator } = require('../middlewares/validators/postValidator');

router.get('/', postController.index);
router.get('/:id', postController.show);
router.post('/', postValidator, postController.store);

module.exports = router;