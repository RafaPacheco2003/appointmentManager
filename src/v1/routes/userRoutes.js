const express = require('express'); 
const router = express.Router();
const userController = require('../../modules/user/controllers/userController');
const validateRequest = require('../../modules/common/middlewares/validateRequest');
const { createUserSchema, updateUserSchema } = require('../../modules/user/schemas/userSchema');

router
    .get('/', userController.getAllUsers)
    .get('/email/:email', userController.getUserByEmail)
    .get('/phone/:phone', userController.getUserByPhone)
    .get('/details/:id', userController.getUserDetails)
    .get('/:userId', userController.getUserById)
    .post('/', validateRequest(createUserSchema), userController.createUser);

module.exports = router;