const { saleModel } = require('../models');

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
  const registeredSaleData = await saleModel.insert(newSale);

  return { status: 'CREATED', data: registeredSaleData };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertNewSale,
};