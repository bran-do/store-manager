const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const { saleService } = require('../../../src/services');
const {
  saleListFromService,
  emptySaleListFromService,
  saleFromService,
  saleNotFoundService,
  newSaleFromService,
  deletedSaleFromService,
} = require('../mocks/sale.mock');

const app = require('../../../src/app');

describe('SALE CONTROLLER:', function () {
  it('Listando todas sales com sucesso', async function () {
    sinon.stub(saleService, 'getAllSales').resolves(saleListFromService);

    const res = await chai.request(app).get('/sales');
    const { status, body } = res;

    expect(status).to.equal(200);
    expect(body).to.deep.equal(saleListFromService.data);
  });

  it('Listando todas sales sem sucesso (lista vazia)', async function () {
    sinon.stub(saleService, 'getAllSales').resolves(emptySaleListFromService);

    const res = await chai.request(app).get('/sales');
    const { status, body } = res;

    expect(status).to.equal(404);
    expect(body).to.deep.equal(emptySaleListFromService.data);
  });
  afterEach(function () { sinon.restore(); });

  it('Recuperando sale por id com sucesso', async function () {
    sinon.stub(saleService, 'getSaleById').resolves(saleFromService);

    const INPUT_DATA = 1;
    const res = await chai.request(app).get(`/sales/${INPUT_DATA}`);
    const { status, body } = res;

    expect(status).to.equal(200);
    expect(body).to.deep.equal(saleFromService.data);
  });

  it('Recuperando sale por id sem sucesso', async function () {
    sinon.stub(saleService, 'getSaleById').resolves(saleNotFoundService);

    const INPUT_DATA = 9999;
    const res = await chai.request(app).get(`/sales/${INPUT_DATA}`);
    const { status, body } = res;

    expect(status).to.equal(404);
    expect(body).to.deep.equal(saleNotFoundService.data);
  });

  it('Inserindo sale com sucesso', async function () {
    sinon.stub(saleService, 'insertNewSale').resolves(newSaleFromService);

    const BODY_INPUT_DATA = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const res = await chai.request(app)
      .post('/sales')
      .send(BODY_INPUT_DATA);

    const { status, body } = res;

    expect(status).to.equal(201);
    expect(body).to.deep.equal(newSaleFromService.data);
  });

  it('Inserindo sale sem productId', async function () {
    sinon.stub(saleService, 'insertNewSale').resolves(newSaleFromService);

    const BODY_INPUT_DATA = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        quantity: 5,
      },
    ];

    const res = await chai.request(app)
      .post('/sales')
      .send(BODY_INPUT_DATA);

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ message: '"productId" is required' });
  });

  it('Deletando sale com sucesso', async function () {
    sinon.stub(saleService, 'removeExistingSale').resolves(deletedSaleFromService);

    const ID_PARAM_INPUT = 1;

    const res = await chai.request(app)
      .delete(`/sales/${ID_PARAM_INPUT}`);

    expect(res.status).to.equal(204);  
  });

  it('Deletando sale com id inválido', async function () {
    sinon.stub(saleService, 'removeExistingSale').resolves(saleNotFoundService);

    const ID_PARAM_INPUT = 99;

    const res = await chai.request(app)
      .delete(`/sales/${ID_PARAM_INPUT}`);

    const { status, body } = res;

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Sale not found' });
  });
});