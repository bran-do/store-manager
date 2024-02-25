const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');
const { 
  saleFromModel,
  saleListFromModel,
} = require('../mocks/sale.mock');

describe('SALE MODEL:', function () {
  it('Listando todas sales', async function () {
    sinon.stub(connection, 'execute').resolves([saleListFromModel]);

    const saleList = await saleModel.findAll();

    expect(saleList).to.be.an('array');
    expect(saleList).to.deep.equal(saleListFromModel);
  });

  afterEach(function () { sinon.restore(); });

  it('Recuperando sale por id', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromModel]);

    const INPUT_DATA = 1;
    const sale = await saleModel.findById(INPUT_DATA);

    expect(sale).to.be.an('array');
    expect(sale).to.deep.equal(saleFromModel);
  });
});
