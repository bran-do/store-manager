// Model
const productFromModel = { id: 2, name: 'Traje de encolhimento' };

const productListFromModel = [
  { id: 1, name: 'Martelo do Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const noProductList = [];

const newProductFromModel = { id: 4, name: 'Esquilo de pelúcia' };

const updatedProductFromModel = { id: 4, name: 'Esquilo de plástico' };

const multipleIdResultFromDB = [{ id: 1 }, { id: 2 }];

const multipleIdResultFromModel = [{ id: 1 }, { id: 2 }];

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

const newProductFromService = {
  status: 'CREATED',
  data: newProductFromModel,
};

const updatedProductFromService = {
  status: 'SUCCESSFUL',
  data: updatedProductFromModel,
};

module.exports = {
  productFromModel,
  productListFromModel,
  noProductList,
  newProductFromModel,
  updatedProductFromModel,
  multipleIdResultFromDB,
  multipleIdResultFromModel,
  productFromService,
  productNotFoundFromService,
  productListFromService,
  emptyProductListFromService,
  newProductFromService,
  updatedProductFromService,
};