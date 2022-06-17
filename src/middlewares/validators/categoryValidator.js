const { check, validationResult } = require('express-validator'); 
const formatValidatorErrors = require('../../helpers/formatValidatorErrors');

exports.categoryValidator = [
    check('name')
    .notEmpty().withMessage('Name is required')
    .bail()
    .isLength({ min: 3, max: 150 }).withMessage('Characters must be between 3 and 150'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(422).json({ errors: formatValidatorErrors.common(errors) });
            return;
        }

        next();
    }
]