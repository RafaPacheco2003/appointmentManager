
const Role = require('../models/roleModel');

const getRoles = async () => {
    try {
        return await Role.findAll();
    } catch (error) {
        throw new Error(`Error al obtener roles: ${error.message}`);
    }
};

const getRoleById = async (id) => {
    try {
        return await Role.findByPk(id);
    } catch (error) {
        throw new Error(`Error al obtener rol por ID: ${error.message}`);
    }
};
const getRoleByName = async (name, transaction) => {
    const role = await Role.findOne({
        where: { name: name },
        transaction
    });

    if (!role) {
        throw new Error(`Role "${name}" not found`);
    }

    return role;
};
module.exports = {
    getRoles,
    getRoleById,
    getRoleByName
};