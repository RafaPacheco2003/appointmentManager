const User = require('../../user/models/userModel');
const { hashPassword } = require('./passwordService');
const { getRoleByName } = require('../../role/service/roleGetService');

class RegistrationFactory {
    constructor() {
        this.strategies = new Map();
        this._registerDefaultStrategies();
    }

    _registerDefaultStrategies() {
        this.registerStrategy('admin', require('./registrations/adminRegistration'));
        this.registerStrategy('customer', require('./registrations/customerRegistration'));
        this.registerStrategy('employee', require('./registrations/employeeRegistration'));
    }

    registerStrategy(type, strategy) {
        this.strategies.set(type.toLowerCase(), strategy);
    }

    getStrategy(type) {
        const strategy = this.strategies.get(type.toLowerCase());
        if (!strategy) {
            throw new Error(`Registration strategy for type '${type}' not found`);
        }
        return strategy;
    }

    async createUserWithRole(roleName, userData, transaction) {
        const { password, ...rest } = userData;

        const role = await getRoleByName(roleName, transaction);
        const hashedPassword = await hashPassword(password);

        return User.create(
            {
                ...rest,
                password: hashedPassword,
                roleId: role.id
            },
            { transaction }
        );
    }
}

const registrationFactory = new RegistrationFactory();

module.exports = {
    createUserWithRole: (roleName, userData, transaction) => 
        registrationFactory.createUserWithRole(roleName, userData, transaction),
    getRegistrationStrategy: (type) => registrationFactory.getStrategy(type),
    registerStrategy: (type, strategy) => registrationFactory.registerStrategy(type, strategy),
};
