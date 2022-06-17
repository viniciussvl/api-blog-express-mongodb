const formatValidatorErrors = require('../../src/helpers/formatValidatorErrors');

const errorsInput = [
    { msg: 'Required field', param: 'name', value: 'Ze Vaqueiro' },
    { msg: 'Required field', param: 'email', value: 'ze-vaqueiro@hotmail.com' }
]

const errorsInputMissingFields = [
    { msg: 'Required field', param: 'name', value: 'Ze Vaqueiro' },
    { value: 'ze-vaqueiro@hotmail.com' }
]

const errorsOutput = [
    { msg: 'Required field', field: 'name' },
    { msg: 'Required field', field: 'email' }
]

describe('Format validator errors', () => {
    it('should return an array of objects with msg and field', () => {
        expect(formatValidatorErrors.common(errorsInput))
        .toStrictEqual(errorsOutput)
    })

    it('should return an error exception that fields are undefined', () => {
        expect(() => { formatValidatorErrors.common(errorsInputMissingFields); }).toThrow();
    })
})