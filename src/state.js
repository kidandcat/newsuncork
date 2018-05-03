import { location } from "@hyperapp/router";
import loading from "./assets/loading.gif";

export const state = {
  products: [],
  optiontypes: [],
  images: {},
  defaultImage: loading,
  activeProduct: null,
  activeImage: 0,
  location: location.state,
  logged: false,
  loading: true
};
