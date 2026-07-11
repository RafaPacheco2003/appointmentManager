const roleService = require('../service/roleService');
const { presentError } = require('../../common/responsePresenter');

const getAvailablerolees = async (req, res) => {
    try {
        const values = await roleService.getAvailablerolees();
        res.status(200).json(values);
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

module.exports = {
    getAvailablerolees
};