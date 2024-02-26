// Model & DB
const saleFromModel = [
  {
    saleId: 1,
    date: '2024-02-25T00:55:32.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-02-25T00:55:32.000Z',
    productId: 2,
    quantity: 10,
  },
];

const saleListFromModel = [
  {
    saleId: 1,
    date: '2024-02-25T00:55:32.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-02-25T00:55:32.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-02-25T00:57:32.000Z',
    productId: 3,
    quantity: 15,
  },
];

const noSaleList = [];

const saleIdFromDB = { insertId: 3 };

const newSaleFromModel = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1, 
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

// Service
const saleFromService = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleNotFoundService = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const saleListFromService = {
  status: 'SUCCESSFUL',
  data: saleListFromModel,
};

const emptySaleListFromService = {
  status: 'NOT_FOUND',
  data: { message: 'No sale registered' },
};

const newSaleFromService = {
  status: 'CREATED',
  data: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1, 
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};

module.exports = {
  saleFromModel,
  saleListFromModel,
  noSaleList,
  saleIdFromDB,
  newSaleFromModel,
  saleFromService,
  saleNotFoundService,
  saleListFromService,
  emptySaleListFromService,
  newSaleFromService,
};