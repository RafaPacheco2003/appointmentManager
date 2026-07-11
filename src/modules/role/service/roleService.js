const Role = require('../models/roleModel');

const createRole = async (roleData) => {
    return await Role.create(roleData);
};

module.exports = {
    createRole
};