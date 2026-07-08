const { createSubscription } = require('../../../subscription/services/subscriptionService');
const {createVerificationCode} = require('../../../email/services/emailService');
const role = 'ADMIN';


const afterCreate = async(
    user,
    data,
    transaction
)=>{

    console.log('emtra al servicio after');
    if(!data.subscription?.planId){
        throw new Error('Plan is required');
    }
    console.log('Si tiene plan')
    const subscription = await createSubscription({...data.subscription, userId:user.id}, transaction);
    console.log('Crea subcirption con plan')


    console.log(subscription);

    console.log('Entra a create code');
    await createVerificationCode(user.id,'EMAIL_VERIFICATION', transaction);
    

    return {
        user,
        subscription
    };

};


module.exports = {
    role,
    afterCreate
};