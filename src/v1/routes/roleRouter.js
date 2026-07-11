const express = require('express');
const router = express.Router();
const roleController = require('../../modules/role/controllers/roleController');

router.get('/values', roleController.getAvailablerolees);

module.exports = router;