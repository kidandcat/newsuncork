import { location } from "@hyperapp/router";

export const state = {
  products: [],
  activeProduct: null,
  activeImage: 0,
  location: location.state
};
