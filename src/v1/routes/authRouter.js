const express = require('express');
const router = express.Router();

const validateRequest = require('../../modules/common/middlewares/validateRequest');
const { registerAdminSchema } = require('../../modules/auth/schemas/registerSchema');

const authController = require('../../modules/auth/controllers/authController');
const userController = require('../../modules/user/controllers/userController');

router.post(
    '/register',
    validateRequest(registerAdminSchema),
    authController.registerUser
);

router.post(
    '/verify-email',
    userController.verifyEmail
);

module.exports = router;