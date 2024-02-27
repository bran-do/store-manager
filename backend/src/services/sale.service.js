const { saleModel } = require('../models');
const { validateNewSale } = require('./validations/validateInputValues');

const getAllSales = async () => {
  const saleList = await saleModel.findAll();

  if (saleList.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'No sale registered' } };
  }

  return { status: 'SUCCESSFUL', data: saleList };
};

const getSaleById = async (id) => {
  const sale = await saleModel.findById(id);

  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sale };
};

const insertNewSale = async (newSale) => {
  const invalidSale = await validateNewSale(newSale);
  if (invalidSale) return invalidSale;

  const saleInsideDB = await saleModel.insert(newSale);

  return { status: 'CREATED', data: saleInsideDB };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertNewSale,
};