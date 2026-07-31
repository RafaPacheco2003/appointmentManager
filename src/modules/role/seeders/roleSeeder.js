const Role = require('../models/roleModel');

const DEFAULT_ROLES = [
    { name: 'ROOT',     description: 'Super administrador del sistema' },
    { name: 'ADMIN',    description: 'Administrador de organización' },
    { name: 'EMPLOYEE', description: 'Empleado de sucursal' },
    { name: 'CUSTOMER', description: 'Cliente registrado' },
];

const seedRoles = async () => {
    for (const role of DEFAULT_ROLES) {
        await Role.findOrCreate({
            where: { name: role.name },
            defaults: role,
        });
    }
    console.log('[Seeder] Roles verificados/insertados:', DEFAULT_ROLES.map(r => r.name).join(', '));
};

module.exports = seedRoles;
