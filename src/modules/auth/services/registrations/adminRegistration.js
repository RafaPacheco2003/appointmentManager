const { createSubscription } = require('../../../subscription/services/subscriptionService');
const {createVerificationCode} = require('../../../email/services/emailService');
const role = 'ADMIN';


const afterCreate = async(
    user,
    transaction
)=>{





    console.log('Entra a create code');
    await createVerificationCode(user.id,'EMAIL_VERIFICATION', transaction);
    

    return {
        user
    };

};


module.exports = {
    role,
    afterCreate
};