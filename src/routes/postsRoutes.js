const router = require('express').Router();
const postController = require('../controllers/postController');

router.get('/', postController.index);

module.exports = router;