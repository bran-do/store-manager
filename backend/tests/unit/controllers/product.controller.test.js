const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const { productService } = require('../../../src/services');
const {
  productListFromService,
  emptyProductListFromService,
  productFromService,
  productNotFoundFromService,
  newProductFromService,
} = require('../mocks/product.mock');

const app = require('../../../src/app');

describe('PRODUCT CONTROLLER', function () {
  it('Listando todos products com sucesso', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(productListFromService);

    const res = await chai.request(app).get('/products');
    const { status, body } = res;

    expect(status).to.equal(200);
    expect(body).to.deep.equal(productListFromService.data);
  });

  it('Listando todos products sem sucesso (lista vazia)', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(emptyProductListFromService);

    const res = await chai.request(app).get('/products');
    const { status, body } = res;

    expect(status).to.equal(404);
    expect(body).to.deep.equal(emptyProductListFromService.data);
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(productService, 'getProductById').resolves(productFromService);

    const INPUT_DATA = 2;
    const res = await chai.request(app).get(`/products/${INPUT_DATA}`);
    const { status, body } = res;

    expect(status).to.equal(200);
    expect(body).to.deep.equal(productFromService.data);
  });

  it('Recuperando product por id sem sucesso', async function () {
    sinon.stub(productService, 'getProductById').resolves(productNotFoundFromService);

    const INPUT_DATA = 9999;
    const res = await chai.request(app).get(`/products/${INPUT_DATA}`);
    const { status, body } = res;

    expect(status).to.equal(404);
    expect(body).to.deep.equal(productNotFoundFromService.data);
  });

  it('Inserindo product com sucesso', async function () {
    sinon.stub(productService, 'insertNewProduct').resolves(newProductFromService);

    const BODY_INPUT_DATA = { name: 'Esquilo de pélucia' };

    const res = await chai.request(app)
      .post('/products')
      .send(BODY_INPUT_DATA);

    const { status, body } = res;

    expect(status).to.equal(201);
    expect(body).to.deep.equal(newProductFromService.data);
  });

  it('Inserindo product sem campos obrigatórios', async function () {
    const BODY_INPUT_DATA = {};

    const missingFieldMessage = {
      message: '"name" is required',
    };

    const res = await chai.request(app)
      .post('/products')
      .send(BODY_INPUT_DATA);

    const { status, body } = res;

    expect(status).to.equal(400);
    expect(body).to.deep.equal(missingFieldMessage);
  });

  it('Retorna status code 500 para status não-mapeado no mapStatusHTTP', async function () {
    const unmappedServiceStatus = {
      status: 'STATUS_2222',
      data: 1,
    };

    sinon.stub(productService, 'getProductById').resolves(unmappedServiceStatus);

    const res = await chai.request(app).get('/products/1');
    const { status } = res;

    expect(status).to.equal(500);
  });

  afterEach(function () { sinon.restore(); });
});