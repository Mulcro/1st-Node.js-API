const express = require('express');
const router = express.Router();
const path = require('path');
const resgisterController = require('../controllers/registerController.js')

router.post('/', resgisterController.handleNewUser)

module.exports = router;