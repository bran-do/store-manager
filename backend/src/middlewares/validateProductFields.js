const checkRequiredFields = require('../utils/checkRequiredFields');

const validateProductFields = (req, res, next) => {
  const productRequiredFields = ['name'];

  const { body } = req;
  const productError = checkRequiredFields(body, productRequiredFields);

  if (productError) {
    return res.status(400).json({ message: productError });
  }

  next();
};

module.exports = validateProductFields;