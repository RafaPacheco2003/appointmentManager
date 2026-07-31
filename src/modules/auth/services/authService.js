
const sequelize = require('../../../databases/sequelize');
const { createUserWithRole } = require('./registrationFactory');

const register = async (registration, data) => {
    return sequelize.transaction(async (transaction) => {
        console.log(`Creando usuario con rol: ${registration.roleName}`);
        
        // Crear usuario con el rol específico
        const user = await createUserWithRole(
            registration.roleName,
            data,
            transaction
        );
        
        console.log('Usuario creado exitosamente:', user.id);
        
        // Ejecutar afterCreate específico del registro
        console.log('Ejecutando afterCreate...');
        const result = await registration.afterCreate(user, transaction);
        
        return result;
    });
};

const registerAdmin = async (data) => {
    const adminRegistration = require('./registrations/adminRegistration');
    return register(adminRegistration, data);
};

const registerCustomer = async (data) => {
    const customerRegistration = require('./registrations/customerRegistration');
    return register(customerRegistration, data);
};



module.exports = {
    register,
    registerAdmin,
    registerCustomer
    
};