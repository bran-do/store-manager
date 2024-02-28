const { productModel } = require('../models');
const { validateNewProduct } = require('./validations/validateInputValues');

const getAllProducts = async () => {
  const productList = await productModel.findAll();

  if (productList.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'No product registered' } };
  }
  return { status: 'SUCCESSFUL', data: productList };
};

const getProductById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: product };
};

const insertNewProduct = async (newProduct) => {
  const invalidValue = validateNewProduct(newProduct);
  if (invalidValue) return invalidValue;

  const productInsideDB = await productModel.insert(newProduct);

  return { status: 'CREATED', data: productInsideDB };
};

const updateExistingProduct = async (productId, updateData) => {
  const invalidValue = validateNewProduct(updateData);
  if (invalidValue) return invalidValue;

  const product = await productModel.findById(productId);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const updatedProductInsideDB = await productModel.update(productId, updateData);

  return { status: 'SUCCESSFUL', data: updatedProductInsideDB };
};

const removeExistingProduct = async (id) => {
  const existingId = await productModel.findById(id);
  if (!existingId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productModel.remove(id);
  
  return { status: 'NO_CONTENT', data: {} };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertNewProduct,
  updateExistingProduct,
  removeExistingProduct,
};