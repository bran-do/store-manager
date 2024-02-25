const { saleService } = require('../services');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const allSales = async (_req, res) => {
  const { status, data } = await saleService.getAllSales();

  res.status(mapStatusHTTP(status)).json(data);
};

const saleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.getSaleById(id);

  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  allSales,
  saleById,
};