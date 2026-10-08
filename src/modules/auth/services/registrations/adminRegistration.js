const RegistrationStrategy = require('./RegistrationStrategy');
const { createVerificationCode } = require('../../../email/services/emailService');

class AdminRegistration extends RegistrationStrategy {
    getRoleName() {
        return 'ADMIN';
    }

    async afterCreate(user, transaction) {
        await createVerificationCode(user.id, 'EMAIL_VERIFICATION', transaction);
        
        return {
            user,
            message: 'Admin registered successfully. Verification email sent.'
        };
    }
}

module.exports = new AdminRegistration();
