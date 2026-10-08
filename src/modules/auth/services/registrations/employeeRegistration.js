const RegistrationStrategy = require('./RegistrationStrategy');

class EmployeeRegistration extends RegistrationStrategy {
    getRoleName() {
        return 'EMPLOYEE';
    }

    async afterCreate(user, transaction) {
        return {
            user,
            message: 'Employee registered successfully'
        };
    }
}

module.exports = new EmployeeRegistration();
