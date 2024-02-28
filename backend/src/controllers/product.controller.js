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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const { status, data } = await productService.updateExistingProduct(id, updateData);

  return res.status(mapStatusHTTP(status)).json(data);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.removeExistingProduct(id);

  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  return res.sendStatus(mapStatusHTTP(status));
};

module.exports = {
  allProducts,
  productById,
  newProduct,
  updateProduct,
  removeProduct,
};