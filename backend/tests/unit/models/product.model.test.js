const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { 
  productFromDB,
  productFromModel,
  productListFromDB,
  productListFromModel,
} = require('../mocks/product.mock');

describe('PRODUCT MODEL:', function () {
  it('Recuperando lista de todos os products', async function () {
    sinon.stub(connection, 'execute').resolves([productListFromDB]);

    const productList = await productModel.findAll();

    expect(productList).to.be.an('array');
    expect(productList).to.deep.equal(productListFromModel);
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const INPUT_DATA = 2;
    const product = await productModel.findById(INPUT_DATA);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal(productFromModel);
  });

  afterEach(function () { sinon.restore(); });
});