const express = require('express');
const { verifyLogin } = require('../controller/authController');

const router = express.Router();

router.post('/verify-login', verifyLogin);

module.exports = router;
