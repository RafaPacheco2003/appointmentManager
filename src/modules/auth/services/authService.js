const sequelize = require('../../../databases/sequelize');
const { createUserWithRole } = require('./registrationFactory');

const adminRegistration = require('../services/registrations/adminRegistration');


const register = async (registration, data) => {

    return sequelize.transaction(
        async(transaction)=>{

            console.log('Entra en servicio y va a crear usuario con role')
            const user = await createUserWithRole(
                registration.role,
                data,
                transaction
            );
            console.log('Sale de user con role');
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