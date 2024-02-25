const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.get('/', saleController.allSales);

router.get('/:id', saleController.saleById);

module.exports = router;