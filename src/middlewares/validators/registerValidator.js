const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const formatValidatorErrors = require('../../helpers/formatValidatorErrors');

exports.registerValidator = [
    check('email').isEmail().withMessage('Invalid e-mail')
    .custom(async (value) => {
        const userExists = await User.findOne({ email: value });
        if(userExists) {
            throw new Error('User already exists');
        }
    }),
    check('name').isString().isLength({ min: 3, max: 100 }),
    check('password').isString().isLength({ min: 3, max: 150 }),
    check('confirmPassword').isString().custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('wrong confirm password');
        }

        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: formatValidatorErrors.common(errors.array()) });
        }

        next();
    }
];