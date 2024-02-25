// Model & DB
const productFromDB = { id: 2, name: 'Traje de encolhimento' };
const productFromModel = { id: 2, name: 'Traje de encolhimento' };

const productListFromDB = [
  { id: 1, name: 'Martelo do Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const productListFromModel = [
  { id: 1, name: 'Martelo do Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const noProductList = [];

// Service
const productFromService = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productNotFoundFromService = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const productListFromService = {
  status: 'SUCCESSFUL',
  data: productListFromModel,
};

const emptyProductListFromService = {
  status: 'NOT_FOUND',
  data: { message: 'No product registered' },
};

module.exports = {
  productFromDB,
  productFromModel,
  productListFromDB,
  productListFromModel,
  noProductList,
  productFromService,
  productNotFoundFromService,
  productListFromService,
  emptyProductListFromService,
};