
const User = require('../models/userModel');
const Subscription = require('../../subscription/models/subscriptionModel');
const Plan = require('../../plan/models/planModel');
const SUBSCRIPTION_STATUS = require('../../subscription/constants/subscriptionStatus');
const {getValidVerificationCode, markVerificationCodeUsed} = require('../../email/services/emailService');
const { type } = require('node:os');

const createUser = async (userData) => {
    return await User.create(userData);
};

const getAllUsers = async () => {
    return await User.findAll();
};

const getUserDetails = async (id) => {

    console.log("ID recibido:", id);

    const user = await User.findByPk(id);

    console.log("USER FOUND:", user);

    if (!user) {
        throw new Error('User not found');
    }

    const subscription = await Subscription.findOne({
        where: {
            userId: id,
            status: SUBSCRIPTION_STATUS.ACTIVE
        },
        include: [{ model: Plan, as: 'plan' }]
    });

    return { user, subscription };
};

const getUserByEmail = async (email) => {
    return await User.findOne({
        where: { email }
    });
};

const getUserByPhone = async (phone) => {
    return await User.findOne({
        where: { phone }
    });
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

const updateUser = async (id, userData) => {
    const [updated] = await User.update(userData, {
        where: { id }
    });
    if (updated) {
        return await getUserById(id);
    }
    return null;
};

const markEmailAsVerified = async(code, userId, type) => {


    console.log('Entra e servico');
    const emailCode = await getValidVerificationCode(userId,code, type);
    
    console.log('Valida si es ivalido o expirado');

    console.log(emailCode);
    if(!emailCode){
        throw new Error('Código inválido o expirado');
    }
    console.log('Cambiamos su valor del code')
    console.log(emailCode.used);


   
    await markVerificationCodeUsed(emailCode.id);
    console.log('Cambio su valor');
    console.log(emailCode.used);



    console.log('Entra al update del usuario ');
    const user = await User.update(
        
        {
        
            emailVerified: true
        },

        {
            where:{
                id: userId
            }
        }
    )
    console.log('verificamos si cambio:  ');
    console.log(user.used);
    
    return user;
    

}

const deleteUser = async (id) => {
    return await User.destroy({
        where: { id }
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserByPhone,
    getUserDetails,
    markEmailAsVerified
};