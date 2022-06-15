const router = require('express').Router();
const UserController = require('../controllers/UserController');
const Authentication = require('../middlewares/Authentication');
const userController = new UserController();

router.get('/:id', Authentication, async (req, res) => {
    const id = req.params.id;

    try {
        const data = await userController.show(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }        
});

module.exports = router;