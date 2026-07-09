const EmailVerification = require('../models/emailVerificationModel');
const User = require('../../user/models/userModel');
const { Op } = require('sequelize')
const crypto = require('crypto');

const createVerificationCode = async (userId, type, transaction) => {

    
    const verification = await EmailVerification.create(
        {
            userId,
            type,
            code: generateCode(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        },
        {
            transaction
        }
    );



    return verification;
};

const getValidVerificationCode = async (userId, code, type) => {
    return await EmailVerification.findOne({
        where: {
            userId,
            code,
            type,
            used: false,
            expiresAt: {
                [Op.gt]: new Date()
            }
        }
    });
};



const markVerificationCodeUsed = async (id) => {
    
    return await EmailVerification.update(
    
        {
        used:true
        },
    {
        where:{
            id
        }
    })
}
const generateCode = (length = 6) => {
    console.log('=== Generando código de verificación ===');
    console.log('Length:', length);

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length);

    console.log('Min:', min);
    console.log('Max:', max);

    const code = crypto.randomInt(min, max).toString();

    console.log('Código generado:', code);
    console.log('========================================');

    return code;
};


module.exports = {
    createVerificationCode,
    getValidVerificationCode,
    markVerificationCodeUsed
}