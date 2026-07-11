const express = require('express');
const router = express.Router();
const roleController = require('../../modules/role/controllers/roleController');
const validateRequest = require('../../modules/common/middlewares/validateRequest');
const { createRoleSchema } = require('../../modules/role/schemas/roleSchema');

router.get('/', roleController.getRoles);
router.post('/', validateRequest(createRoleSchema), roleController.createRole);

module.exports = router;