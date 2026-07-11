
const { presentError, presentSuccess } = require('../../common/responsePresenter');
const { presentRole, presentRoles } = require('../presenters/rolePresenter');
const roleGetService = require('../service/roleGetService');
const roleService = require('../service/roleService');

const getRoles = async (req, res) => {
    try {
        const roles = await roleGetService.getRoles();
        res.status(200).json(presentSuccess(presentRoles(roles), 'Roles fetched successfully'));
    } catch (error) {
        res.status(500).json(presentError(error.message, 'Error fetching roles'));
    }
};

const createRole = async (req, res) => {
    console.log(req.body);
    console.log('Entra a crear role');
    try {
        const role = await roleService.createRole(req.body);
        res.status(201).json(presentSuccess(presentRole(role), 'Role created successfully'));
    } catch (error) {
        res.status(500).json(presentError(error.message, 'Error creating role'));
    }
};

module.exports = {
    getRoles,
    createRole
};