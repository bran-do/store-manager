const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumns, getFormattedPlaceholders } = require('../utils/queryFormatting');

async function registerSaleProduct(product, saleId) {
  const columns = getFormattedColumns(product);
  const placeholders = getFormattedPlaceholders(product);

  await connection.execute(
    `INSERT INTO sales_products (sale_id, ${columns})
      VALUES (?,${placeholders})`,
    [saleId, ...Object.values(product)],
  );
}

const findAll = async () => {
  const [saleList] = await connection.execute(
    `SELECT sale_id, sl.date, product_id, quantity
    FROM sales_products
    INNER JOIN sales AS sl
      ON sale_id = sl.id
    ORDER BY
      sale_id ASC, product_id ASC`,
  );

  return camelize(saleList);
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT sl.date, product_id, quantity
    FROM sales_products
    INNER JOIN sales AS sl
      ON sale_id = sl.id
    WHERE sale_id = ?
    ORDER BY product_id ASC`,
    [id],
  );
  return camelize(sale);
};

const insert = async (sale) => {
  const nowDate = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (?)',
    [nowDate],
  );

  sale.forEach((product) => registerSaleProduct(product, insertId));

  return { id: insertId, itemsSold: sale };
};

const remove = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
};