const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController.js')

router.post('/', authController.handleLogin);

module.exports = router;