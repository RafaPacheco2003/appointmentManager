const User = require('../../user/models/userModel');
const Role = require('../../role/models/roleModel');
const { hashPassword } = require('./passwordService');
const {getRoleByName} = require('../../role/service/roleGetService')

const createUserWithRole = async (roleName, userData, transaction) => {
    const { password, ...rest } = userData;


    const role = await getRoleByName(roleName, transaction);



   
    const hashedPassword = await hashPassword(password);

    return User.create(
        {
            ...rest,
            password: hashedPassword,
            roleId: role.id  
        },
        { transaction }
    );
};
module.exports = {
    createUserWithRole  
};