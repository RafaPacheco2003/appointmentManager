const sequelize = require('../../../databases/sequelize');
const { createUserWithrolee } = require('./registrationFactory');

const adminRegistration = require('../services/registrations/adminRegistration');


const register = async (registration, data) => {

    return sequelize.transaction(
        async(transaction)=>{

            console.log('Entra en servicio y va a crear usuario con rolee')
            const user = await createUserWithrolee(
                registration.rolee,
                data,
                transaction
            );
            console.log('Sale de user con rolee');
            console.log(user);

            console.log('pasa a afterCreate');
            return registration.afterCreate(
                user,
                transaction
            );

        }
    );

};


const registerAdmin = async(data)=>{
    return register(
        adminRegistration,
        data
    );
};


module.exports = {
    registerAdmin
};