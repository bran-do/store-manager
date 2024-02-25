const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [productList] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );

  return camelize(productList);
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  return camelize(product);
};

module.exports = {
  findAll,
  findById,
};
