const camelize = require('camelize');
const connection = require('./connection');
const { 
  getFormattedColumns,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
} = require('../utils/queryFormatting');

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

const findByMultipleIds = async (idArray) => {
  const placeholders = idArray.map(() => '?').join(',');
  const [foundIds] = await connection.execute(
    `SELECT id FROM products WHERE id IN (${placeholders})`,
    idArray,
  );

  return foundIds;
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

const update = async (productId, updateData) => {
  const columnsAndValues = getFormattedUpdateColumns(updateData);
  const query = `UPDATE products SET ${columnsAndValues} WHERE id = ?`;
  await connection.execute(query, [...Object.values(updateData), productId]);

  const [[productInsideDB]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  return camelize(productInsideDB);
};

module.exports = {
  findAll,
  findById,
  findByMultipleIds,
  insert,
  update,
};
