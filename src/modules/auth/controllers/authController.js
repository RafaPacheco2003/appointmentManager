const authService = require('../services/authService');
const { presentRegister, presentLogin } = require('../presenters/authPresenter');
const { presentError } = require('../../common/responsePresenter');

const registerUser = async (req, res) => {
    try {
        const result = await authService.register('admin', req.body);
        res.status(201).json(presentRegister(result));
    } catch (error) {
        res.status(error.statusCode || 400).json(presentError(error.message));
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(presentLogin(result));
    } catch (error) {
        res.status(error.statusCode || 400).json(presentError(error.message));
    }
};

module.exports = {
    registerUser,
    login
};