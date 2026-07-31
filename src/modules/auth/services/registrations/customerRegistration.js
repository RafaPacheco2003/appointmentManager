
const roleName = 'CUSTOMER';

const afterCreate = async (user, transaction) => {
    console.log('Customer registered successfully');
    
    return {
        user,
        message: 'Customer registered successfully'
    };
};

module.exports = {
    roleName,
    afterCreate
};