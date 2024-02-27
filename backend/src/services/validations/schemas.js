const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5),
});

const addSaleSchema = Joi.object({
  productId: Joi.number().integer().min(1),
  quantity: Joi.number().integer().min(1),
});

module.exports = { 
  addProductSchema,
  addSaleSchema,
};