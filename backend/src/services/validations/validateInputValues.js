const { productModel } = require('../../models');
const { addProductSchema, addSaleSchema } = require('./schemas');

const validateNewProduct = ({ name }) => {
  const { error } = addProductSchema.validate({ name });

  if (error) {
    return { status: 'INVALID_VALUE', data: { message: error.message } };
  }
};

const validateNewSale = async (newSale) => {
  for (let i = 0; i < newSale.length; i += 1) {
    const { productId, quantity } = newSale[i];

    const { error } = addSaleSchema.validate({ productId, quantity });
    if (error) {
      return { status: 'INVALID_VALUE', data: { message: error.message } };
    }
  }

  const productIds = newSale.map((product) => product.productId);
  // Evitando repetições
  const filteredIds = productIds.filter((id, index, self) => self.indexOf(id) === index);

  const foundProducts = await productModel.findByMultipleIds(filteredIds);
  const foundIds = foundProducts.map((product) => product.id);

  if (filteredIds.length !== foundIds.length) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};