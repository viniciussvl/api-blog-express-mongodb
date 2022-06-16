const { check, validationResult } = require('express-validator');
const formatValidatorErrors = require('../../helpers/formatValidatorErrors');

exports.postValidator = [
    check('title').isLength({ min: 6, max: 150 }),
    check('content').isEmpty(),
    check('categoryId').isEmpty(),
    check('status').isBoolean(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: formatValidatorErrors.common(errors) });
        }
    }
];