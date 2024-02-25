const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumns, getFormattedPlaceholders } = require('../utils/queryFormatting');

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

const insert = async (product) => {
  const columns = getFormattedColumns(product);
  const placeholders = getFormattedPlaceholders(product);
  const query = `INSERT INTO products (${columns}) VALUES (${placeholders})`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

  const [[productInsideDB]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [insertId],
  );

  return camelize(productInsideDB);
};

module.exports = {
  findAll,
  findById,
  insert,
};
