const { presentUser } = require('../../user/presenters/userPresenter');
const { presentSubscription } = require('../../subscription/presenters/subscriptionPresenter');


const presentRegister = (register) => {

    if (!register) return null;


    return {
        user: presentUser(register.user)
    };

};


module.exports = {
    presentRegister
};