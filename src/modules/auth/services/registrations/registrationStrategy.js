class RegistrationStrategy {
    constructor() {
        if (new.target === RegistrationStrategy) {
            throw new TypeError('Cannot construct RegistrationStrategy instances directly');
        }
    }

    getRoleName() {
        throw new Error('Method getRoleName() must be implemented');
    }

    async afterCreate(user, transaction) {
        throw new Error('Method afterCreate() must be implemented');
    }

    async beforeCreate(userData, transaction) {
        return userData;
    }
}

module.exports = RegistrationStrategy;
