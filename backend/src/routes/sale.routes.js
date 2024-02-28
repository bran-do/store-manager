const express = require('express');
const { saleController } = require('../controllers');
const validateSaleFields = require('../middlewares/validateSaleFields');

const router = express.Router();

router.get('/', saleController.allSales);

router.get('/:id', saleController.saleById);

router.post(
  '/',
  validateSaleFields,
  saleController.newSale,
);

router.delete('/:id', saleController.removeSale);

module.exports = router;