const { check, validationResult } = require('express-validator');
const formatValidatorErrors = require('../../helpers/formatValidatorErrors');


exports.loginValidator = [
    check('email').isEmail().withMessage('Invalid e-mail'),
    check('password').isLength({ min: 3, max: 150 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: formatValidatorErrors.common(errors.array()) });
        }

        next();
    }
];