const AuthController = require('../controllers/AuthController');
const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const authController = new AuthController();

router.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 150 }),
    async (req, res) => {
        const {email, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()} );
        }

        try {
            const token = await authController.login(email, password);
            res.status(200).json({ message: 'Autenticado com sucesso', token: token });
        } catch(error) {
            res.status(error.statusCode).json({ error: error.message })
        }
})

router.post(
    '/register',
    body('email').isEmail(),
    body('name').isLength({min: 3, max: 100}),
    body('password').isLength({ min: 6, max: 150 }),
    body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('A confirmação da senha está errada')
        }
        return true;
    }),
    async (req, res) => {
        const {name, email, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()} );
        }

        try {
            await authController.register(name, email, password);
            res.status(201).json({message: 'Usuario cadastrado com sucesso'});
        } catch(error) {
            console.log(error);
            res.status(error.statusCode).json({error: error.message});
        }
})

module.exports = router;