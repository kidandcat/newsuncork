import { h } from "hyperapp";
import { ProductCreatorApp } from "/src/apps/product-creator";

export const CreateProductStepByStep = ({ match }) => (state, actions) => (
  <div
    key="unique"
    oncreate={elem =>
      ProductCreatorApp({
        path: match.path,
        container: elem,
        createProduct: actions.create,
        options: state.optiontypes
      })
    }
  />
);
