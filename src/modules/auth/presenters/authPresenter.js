const { presentUser } = require('../../user/presenters/userPresenter');
const { presentSubscription } = require('../../subscription/presenters/subscriptionPresenter');

const presentRegister = (register) => {
    if (!register) return null;

    return {
        user: presentUser(register.user)
    };
};

const presentLogin = (login) => {
    if (!login) return null;

    return {
        accessToken: login.accessToken,
        refreshToken: login.refreshToken,
        tokenType: login.tokenType,
        user: presentUser(login.user),
    };
};

module.exports = {
    presentRegister,
    presentLogin
};