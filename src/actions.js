import { location } from "@hyperapp/router";

export const setupActions = server => ({
  location: location.actions,
  createProduct: v => state => {
    server.service("product").create(v);
  },
  productCreated: v => state => ({
    products: [...state.products, v]
  }),
  addProducts: v => state => ({
    products: v
  }),
  getProducts: () => (state, actions) => {
    server
      .service("product")
      .find()
      .then(prods => actions.addProducts(prods.data));
  }
});
