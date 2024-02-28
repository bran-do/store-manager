const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { 
  productFromModel,
  productListFromModel,
  newProductFromModel,
  multipleIdResultFromDB,
} = require('../mocks/product.mock');

describe('PRODUCT MODEL:', function () {
  it('Listando todos products', async function () {
    sinon.stub(connection, 'execute').resolves([productListFromModel]);

    const productList = await productModel.findAll();

    expect(productList).to.be.an('array');
    expect(productList).to.deep.equal(productListFromModel);
  });

  it('Recuperando product por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromModel]]);

    const INPUT_DATA = 2;
    const product = await productModel.findById(INPUT_DATA);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal(productFromModel);
  });

  it('Retornando ids existentes no database', async function () {
    sinon.stub(connection, 'execute').resolves([multipleIdResultFromDB]);

    const INPUT_DATA = [1, 2, 4];
    const foundIds = await productModel.findByMultipleIds(INPUT_DATA);

    expect(foundIds).to.have.length(2);
    expect(foundIds).not.to.include(4);
  });

  it('Inserindo product', async function () {
    sinon.stub(connection, 'execute').resolves([[newProductFromModel]]);

    const INPUT_DATA = { name: 'Esquilo de pelúcia' };
    const insertedProduct = await productModel.insert(INPUT_DATA);

    expect(insertedProduct).to.be.an('object');
    expect(insertedProduct).to.deep.equal(newProductFromModel);
  });

  afterEach(function () { sinon.restore(); });
});