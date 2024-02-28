const express = require('express');
const { productController } = require('../controllers');
const validateProductFields = require('../middlewares/validateProductFields');

const router = express.Router();

router.get('/', productController.allProducts);

router.get('/:id', productController.productById);

router.post(
  '/',
  validateProductFields,
  productController.newProduct,
);

router.put(
  '/:id',
  validateProductFields,
  productController.updateProduct,
);

module.exports = router;