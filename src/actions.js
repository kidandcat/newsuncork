import { location } from "@hyperapp/router";

export const setupActions = server => ({
  location: location.actions,
  createProduct: v => state => {
    server.service("product").create(v);
  },
  productCreated: v => state => {
    state.products.push(v);
  }
});
