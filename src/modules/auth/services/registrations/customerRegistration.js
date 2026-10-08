const RegistrationStrategy = require('./RegistrationStrategy');

class CustomerRegistration extends RegistrationStrategy {
    getRoleName() {
        return 'CUSTOMER';
    }

    async afterCreate(user, transaction) {
        return {
            user,
            message: 'Customer registered successfully'
        };
    }
}

module.exports = new CustomerRegistration();
