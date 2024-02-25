const { productModel } = require('../models');

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

module.exports = {
  getAllProducts,
  getProductById,
};