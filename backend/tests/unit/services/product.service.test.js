const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { 
  productFromModel,
  productListFromModel,
  noProductList,
} = require('../mocks/product.mock');

describe('PRODUCT SERVICE:', function () {
  it('Recuperando lista de todos os products com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(productListFromModel);

    const responseData = [
      { id: 1, name: 'Martelo do Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    const serviceResponse = await productService.getAllProducts();

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(responseData);
  });

  it('Recuperando lista de todos os products sem sucesso (vazia)', async function () {
    sinon.stub(productModel, 'findAll').resolves(noProductList);

    const serviceResponse = await productService.getAllProducts();

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data.message).to.equal('No product registered');
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(productFromModel);

    const responseData = { id: 2, name: 'Traje de encolhimento' };

    const INPUT_DATA = 2;
    const serviceResponse = await productService.getProductById(INPUT_DATA);

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(responseData);
  });

  it('Recuperando product por id sem sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const INPUT_DATA = 9999;
    const serviceResponse = await productService.getProductById(INPUT_DATA);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data.message).to.equal('Product not found');
  });

  afterEach(function () { sinon.restore(); });
});