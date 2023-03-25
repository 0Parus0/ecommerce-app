module.exports = {
    getError(errors, prop) {
        // prop === 'email'||'password'||'passwordConfirmation'
        try {
            // errors.mapped() === {email: {}, password: {}, passwordConfirmation: {}}
            return errors.mapped()[prop].msg;
        } catch (err) {
            return '';
        }
    },
};
