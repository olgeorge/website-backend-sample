const { Loggable } = require('../common/aspects');
const emailValidator = require('email-validator');

class InputValidator {

    @Loggable
    validateEmail(email) {
        if (!email || !email.trim()) {
            throw new Error('Please provide a non-empty e-mail address');
        }
        if (!emailValidator.validate(email.trim())) {
            throw new Error('Please enter a valid e-mail address');
        }
    }
}

module.exports = new InputValidator();
