const express = require('express');
const { getAppData } = require('../controller/appDataController');

const router = express.Router();

router.get('/app-data', getAppData);

module.exports = router;