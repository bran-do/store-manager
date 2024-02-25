const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const allProducts = async (_req, res) => {
  const { status, data } = await productService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const productById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.getProductById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const newProduct = async (req, res) => {
  const product = req.body;
  const { status, data } = await productService.insertNewProduct(product);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  allProducts,
  productById,
  newProduct,
};