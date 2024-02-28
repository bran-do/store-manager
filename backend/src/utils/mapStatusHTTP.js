const httpErrorMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
};

const mapStatusHTTP = (status) => httpErrorMap[status] || 500;

module.exports = mapStatusHTTP;