import { location } from "@hyperapp/router";

export const state = {
  products: [],
  images: {},
  activeProduct: null,
  activeImage: 0,
  location: location.state,
  logged: false,
  loading: true
};
