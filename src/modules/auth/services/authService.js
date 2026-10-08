const sequelize = require('../../../databases/sequelize');
const { createUserWithRole, getRegistrationStrategy } = require('./registrationFactory');
const { getUserByEmail } = require('../../user/services/userService');
const { createAccessToken, createRefreshToken } = require('./tokenservice');
const { verifyPassword } = require('./passwordService');
const { InvalidCredentialsException, EmailNotVerifiedException } = require('../exceptions/AuthException');

const register = async (strategyType, data) => {
    return sequelize.transaction(async (transaction) => {
        const strategy = getRegistrationStrategy(strategyType);
        const processedData = await strategy.beforeCreate(data, transaction);
        const user = await createUserWithRole(strategy.getRoleName(), processedData, transaction);
        const result = await strategy.afterCreate(user, transaction);
        return result;
    });
};

const login = async (data) => {
    const user = await getUserByEmail(data.email);

    if (!user) throw new InvalidCredentialsException();

    await verifyPassword(data.password, user.password);

    if (!user.emailVerified) throw new EmailNotVerifiedException();

    return {
        accessToken: createAccessToken(user),
        refreshToken: createRefreshToken(user),
        tokenType: 'Bearer',
        user,
    };
};

module.exports = {
    register,
    login,
};
