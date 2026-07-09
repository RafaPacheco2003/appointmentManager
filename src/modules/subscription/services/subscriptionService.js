const Subscription = require('../models/subscriptionModel');
const Plan = require('../../plan/models/planModel');
const User = require('../../user/models/userModel');




const createSubscription = async (subscriptionData) => {

    const user = await User.findByPk(subscriptionData.userId);

    if (!user) {
        throw new Error('User not found');
    }

    const plan = await Plan.findByPk(subscriptionData.planId);

    if (!plan) {
        throw new Error('Plan not found');
    }

    return await Subscription.create({
        userId: user.id,
        planId: plan.id,
        stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
        status: 'active'
    });
};


const getAllSubscriptions = async () => {

    return await Subscription.findAll({
        include:[
            {
                model:User,
                as:'user'
            },
            {
                model:Plan,
                as:'plan'
            }
        ]
    });

};




const getSubscriptionActive = async(id)=>{
    return await Subscription.findOne({
        where: {
            userId: ownerId,
            status: SUBSCRIPTION_STATUS.ACTIVE
        },
        include: [{ model: Plan, as: 'plan' }]
    });
}



const getSubscriptionById = async (id)=>{

    return await Subscription.findByPk(id,{
        include:[
            {
                model:User,
                as:'user'
            },
            {
                model:Plan,
                as:'plan'
            }
        ]
    });

};



const getPlanBySubscriptionId = async (subscriptionId) => {

    const subscription = await Subscription.findByPk(subscriptionId, {
        include: [
            {
                model: Plan,
                as: 'plan',
                attributes: ['id', 'name', 'maxOrganizations', 'price']
            }
        ]
    });

    if (!subscription) {
        throw new Error('Subscription not found');
    }

    return subscription.plan;
};


const updateSubscription = async(id, subscriptionData)=>{

    const [updatedRows] =
        await Subscription.update(
            subscriptionData,
            {
                where:{
                    id
                }
            }
        );


    if(!updatedRows){
        throw new Error('Subscription not found');
    }


    return getSubscriptionById(id);

};



const deleteSubscription = async(id)=>{

    const deletedRows =
        await Subscription.destroy({
            where:{
                id
            }
        });


    if(!deletedRows){
        throw new Error('Subscription not found');
    }


    return deletedRows;

};



module.exports = {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    getPlanBySubscriptionId
};