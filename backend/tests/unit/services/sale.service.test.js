const { expect } = require('chai');
const sinon = require('sinon');

const { saleModel, productModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { 
  noSaleList, 
  saleFromModel, 
  saleListFromModel, 
  saleListFromService,
  emptySaleListFromService,
  saleFromService,
  saleNotFoundService,
  newSaleFromModel,
  newSaleFromService,
  deletedSaleFromService,
} = require('../mocks/sale.mock');
const { multipleIdResultFromModel } = require('../mocks/product.mock');

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

  it('Inserindo sale com sucesso', async function () {
    sinon.stub(saleModel, 'insert').resolves(newSaleFromModel);
    sinon.stub(productModel, 'findByMultipleIds').resolves(multipleIdResultFromModel);

    const INPUT_DATA = [
      {
        productId: 1,
        quantity: 1, 
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const result = await saleService.insertNewSale(INPUT_DATA);

    expect(result.status).to.equal('CREATED');
    expect(result.data).to.deep.equal(newSaleFromService.data);
  });

  it('Inserindo sale com quantity inválida', async function () {
    const INPUT_DATA = [
      {
        productId: 1,
        quantity: 1, 
      },
      {
        productId: 2,
        quantity: 0,
      },
    ];

    const result = await saleService.insertNewSale(INPUT_DATA);
    
    expect(result.status).to.equal('INVALID_VALUE');
    expect(result.data).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Inserindo sale com productId inexistente', async function () {
    sinon.stub(productModel, 'findByMultipleIds').resolves([multipleIdResultFromModel]);

    const INPUT_DATA = [
      {
        productId: 99,
        quantity: 1, 
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const result = await saleService.insertNewSale(INPUT_DATA);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Deletando sale com sucesso', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleFromModel);
    sinon.stub(saleModel, 'remove').resolves(undefined);

    const ID_PARAM_INPUT = 1;
    const result = await saleService.removeExistingSale(ID_PARAM_INPUT);

    expect(result.status).to.equal(deletedSaleFromService.status);
  });

  it('Deletando sale com id inválido', async function () {
    sinon.stub(saleModel, 'findById').resolves(noSaleList);

    const ID_PARAM_INPUT = 99;

    const invalidValueMessage = {
      message: 'Sale not found',
    };

    const result = await saleService.removeExistingSale(ID_PARAM_INPUT);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data).to.deep.equal(invalidValueMessage);
  });

  afterEach(function () { sinon.restore(); });
});
