const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.allProducts);

router.get('/:id', productController.productById);

router.post('/', productController.newProduct);

module.exports = router;