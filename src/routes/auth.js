const router = require('express').Router();
const { body, validationResult } = require('express-validator');

router.post('/login', async (req, res) => {
    const {name, email, password, confirmPassword} = req.body;


    try {
        console.log(req.body);
    } catch(error) {
        console.log(error);
    }
})

router.post(
    '/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 150 }),
    body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('A confirmação da senha está errada')
        }

        return true;
    }),
    body('name').isLength({min: 3, max: 100}),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()} );
        }

        const {name, email, password, confirmPassword} = req.body;

        const data = {
            name,
            email,
            password,
            confirmPassword
        }

        try {
            console.log(req.body);
        } catch(error) {
            console.log(error);
        }
})

module.exports = router;