
const { createVerificationCode } = require('../../../email/services/emailService');

const roleName = 'ADMIN';

const afterCreate = async (user, transaction) => {
    console.log('Entra a create code para ADMIN');
    await createVerificationCode(user.id, 'EMAIL_VERIFICATION', transaction);
    
    return {
        user,
        message: 'Admin registered successfully. Verification email sent.'
    };
};

module.exports = {
    roleName,
    afterCreate
};