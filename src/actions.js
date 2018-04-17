import { location } from "@hyperapp/router";
import { getProductByID } from "/src/utils";

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
      .then(prods => actions.addProducts(prods));
  },
  setActiveProduct: id => (state, actions) => {
    const prod = getProductByID(state.products, id);
    return {
      activeProduct: getProductByID(state.products, id)
    };
  },
  setActiveImage: index => (state, actions) => ({
    activeImage: index
  })
});
