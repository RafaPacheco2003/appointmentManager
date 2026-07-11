// DEPRECATED: Not used - role is a simple enum
// See src/modules/role/models/rolee.js for enum definition

const presentRole = (role) => {
    return {
        id: role.id,
        name: role.name,
        description: role.description
    };
};

const presentRoles = (roles) => {
    return roles.map(presentRole);
};
module.exports = {
    presentRole
};