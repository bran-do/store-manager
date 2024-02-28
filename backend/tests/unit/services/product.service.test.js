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
  updatedProductFromModel,
  updatedProductFromService,
  deletedProductFromService,
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

  it('Inserindo product com name inválido', async function () {
    const INPUT_DATA = { name: 'Chá' };

    const invalidValueMessage = {
      message: '"name" length must be at least 5 characters long',
    };

    const result = await productService.insertNewProduct(INPUT_DATA);

    expect(result.status).to.equal('INVALID_VALUE');
    expect(result.data).to.deep.equal(invalidValueMessage);
  });

  it('Atualizando product com sucesso', async function () {
    sinon.stub(productModel, 'update').resolves(updatedProductFromModel);
    sinon.stub(productModel, 'findById').resolves({ name: 'Esquilo de pelúcia' });

    const INPUT_ID = 4;
    const INPUT_UPDATE_DATA = { name: 'Esquilo de plástico' };
    const result = await productService.updateExistingProduct(INPUT_ID, INPUT_UPDATE_DATA);

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal(updatedProductFromService.data);
  });

  it('Atualizando um product com name inválido', async function () {
    const ID_PARAM_INPUT = 4;
    const INPUT_UPDATE_DATA = { name: 'Pá' };

    const invalidValueMessage = {
      message: '"name" length must be at least 5 characters long',
    };

    const result = await productService.updateExistingProduct(ID_PARAM_INPUT, INPUT_UPDATE_DATA);

    expect(result.status).to.equal('INVALID_VALUE');
    expect(result.data).to.deep.equal(invalidValueMessage);
  });

  it('Atualizando um product com id inválido', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const ID_PARAM_INPUT = 99;
    const INPUT_UPDATE_DATA = { name: 'Pá de ferro' };

    const invalidValueMessage = {
      message: 'Product not found',
    };

    const result = await productService.updateExistingProduct(ID_PARAM_INPUT, INPUT_UPDATE_DATA);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data).to.deep.equal(invalidValueMessage);
  });

  it('Deletando product com sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(productFromModel);
    sinon.stub(productModel, 'remove').resolves(undefined);

    const ID_PARAM_INPUT = 2;
    const result = await productService.removeExistingProduct(ID_PARAM_INPUT);

    expect(result.status).to.equal(deletedProductFromService.status);
  });

  it('Deletando product com id inválido', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const ID_PARAM_INPUT = 99;

    const invalidValueMessage = {
      message: 'Product not found',
    };

    const result = await productService.removeExistingProduct(ID_PARAM_INPUT);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data).to.deep.equal(invalidValueMessage);
  });

  afterEach(function () { sinon.restore(); });
});