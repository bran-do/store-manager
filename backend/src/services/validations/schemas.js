const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5),
});

module.exports = { addProductSchema };