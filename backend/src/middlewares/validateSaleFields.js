const checkRequiredFields = require('../utils/checkRequiredFields');

const validateSaleFields = (req, res, next) => {
  const saleRequiredFields = ['productId', 'quantity'];

  const { body } = req;

  for (let i = 0; i < body.length; i += 1) {
    const missingField = checkRequiredFields(body[i], saleRequiredFields);

    if (missingField) {
      return res.status(400).json({ message: missingField });
    }
  }

  next();
};

module.exports = validateSaleFields;