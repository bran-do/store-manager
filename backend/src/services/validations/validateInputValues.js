const { productModel } = require('../../models');
const { addProductSchema, addSaleSchema } = require('./schemas');

const validateNewProduct = ({ name }) => {
  const { error } = addProductSchema.validate({ name });

  if (error) {
    return { status: 'INVALID_VALUE', data: { message: error.message } };
  }
};

async function validateNewSaleProductId(id) {
  const existingId = await productModel.findById(id);

  if (!existingId) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
}

const validateNewSale = async (newSale) => {
  for (let i = 0; i < newSale.length; i += 1) {
    const { productId, quantity } = newSale[i];

    const { error } = addSaleSchema.validate({ productId, quantity });
    if (error) {
      return { status: 'INVALID_VALUE', data: { message: error.message } };
    }

    const invalidId = await validateNewSaleProductId(productId);
    if (invalidId) return invalidId;
  }
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};