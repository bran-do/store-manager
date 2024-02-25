const { expect } = require('chai');
const sinon = require('sinon');

const { saleModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { 
  noSaleList, 
  saleFromModel, 
  saleListFromModel, 
  saleListFromService,
  emptySaleListFromService,
  saleFromService,
  saleNotFoundService,
} = require('../mocks/sale.mock');

describe('SALE SERVICE:', function () {
  it('Lista todas sales com sucesso', async function () {
    sinon.stub(saleModel, 'findAll').resolves(saleListFromModel);

    const result = await saleService.getAllSales();

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal(saleListFromService.data);
  });

  it('Listando todas sales sem sucesso (lista vazia)', async function () {
    sinon.stub(saleModel, 'findAll').resolves(noSaleList);

    const result = await saleService.getAllSales();

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.deep.equal(emptySaleListFromService.data.message);
  });

  it('Recuperando sale por id com sucesso', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleFromModel);

    const INPUT_DATA = 1;
    const result = await saleService.getSaleById(INPUT_DATA);

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data.message).to.deep.equal(saleFromService.data.message);
  });

  it('Recuperando sale por id sem sucesso', async function () {
    sinon.stub(saleModel, 'findById').resolves(noSaleList);

    const INPUT_DATA = 9999;
    const result = await saleService.getSaleById(INPUT_DATA);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.deep.equal(saleNotFoundService.data.message);
  });

  afterEach(function () { sinon.restore(); });
});
