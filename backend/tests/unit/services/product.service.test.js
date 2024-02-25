const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { 
  productFromModel,
  productListFromModel,
  noProductList,
  productListFromService,
  productFromService,
  emptyProductListFromService,
  newProductFromModel,
  newProductFromService,
} = require('../mocks/product.mock');

describe('PRODUCT SERVICE:', function () {
  it('Listando todos products com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(productListFromModel);

    const result = await productService.getAllProducts();

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal(productListFromService.data);
  });

  it('Listando todos products sem sucesso (vazia)', async function () {
    sinon.stub(productModel, 'findAll').resolves(noProductList);

    const result = await productService.getAllProducts();

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.equal(emptyProductListFromService.data.message);
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(productFromModel);

    const INPUT_DATA = 2;
    const result = await productService.getProductById(INPUT_DATA);

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal(productFromService.data);
  });

  it('Recuperando product por id sem sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const INPUT_DATA = 9999;
    const result = await productService.getProductById(INPUT_DATA);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.equal('Product not found');
  });

  it('Inserindo product com sucesso', async function () {
    sinon.stub(productModel, 'insert').resolves(newProductFromModel);

    const INPUT_DATA = { name: 'Esquilo de pelúcia' };
    const result = await productService.insertNewProduct(INPUT_DATA);

    expect(result.status).to.equal('CREATED');
    expect(result.data).to.deep.equal(newProductFromService.data);
  });

  afterEach(function () { sinon.restore(); });
});