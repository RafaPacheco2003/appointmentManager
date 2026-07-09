const userService = require('../services/userService');
const { presentUser, presentUsers, presentUserDetails } = require('../presenters/userPresenter');
const { presentError, presentSuccess } = require('../../common/responsePresenter');
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(presentUser(user));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(presentUsers(users));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.userId);
       
        res.status(200).json(presentUser(user));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const getUserDetails = async (req, res) => {
    try {

        console.log("HIT DETAILS ROUTE");
        console.log(req.originalUrl);
        console.log(req.params);

        const user = await userService.getUserDetails(req.params.id);

        res.status(200).json(presentUserDetails(user));

    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};
const getUserByEmail = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        res.status(200).json(presentUser(user));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const getUserByPhone = async (req, res) => {
    try {
        const user = await userService.getUserByPhone(req.params.phone);
        res.status(200).json(presentUser(user));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};
const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.userId, req.body);
       
        res.status(200).json(presentUser(user));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.userId);
       
        res.status(200).json(presentSuccess('User deleted successfully'));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};


const verifyEmail = async (req, res) => {
    try {
        const { userId, code } = req.body;

        const user = await userService.markEmailAsVerified(
            code,
            userId,
            'EMAIL_VERIFICATION'
        );

        res.status(200).json(presentUser(user));
    } catch (error) {
        res.status(400).json(presentError(error.message));
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserByPhone,
    getUserDetails,
    verifyEmail
};