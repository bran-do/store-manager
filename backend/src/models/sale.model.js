const camelize = require('camelize');
const connection = require('./connection');

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

module.exports = {
  findAll,
  findById,
};