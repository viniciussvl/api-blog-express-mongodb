const { check, validationResult } = require('express-validator');
const formatValidatorErrors = require('../../helpers/formatValidatorErrors');
const Category = require('../../models/Category');

exports.postValidator = [
    check('title').isString().isLength({ min: 6, max: 150 }),
    check('content').isString().isLength({ min: 6 }).withMessage('Mininum length is 6'),
    check('categoryId').isMongoId().withMessage('Invalid category id').bail()
    .custom(async (value) => {
        try {
            const category = await Category.findById(value);
        } catch (error) {
            throw new Error('Category not found');
        }

        return true;
    }),
    check('status').isBoolean(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: formatValidatorErrors.common(errors.array()) });
        }

        next();
    }
];