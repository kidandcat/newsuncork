const product = require('./product/product.service.js');
module.exports = function (app) {
  app.configure(product);
};
