const express = require('express');
const { healthController } = require('./controller/healthController');

const router = express.Router();

router.get('/health', healthController.getHealth);
router.get('/db-test', healthController.dbTest);

module.exports = { routes: router };

