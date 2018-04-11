import { h } from "hyperapp";
import { Link } from "@hyperapp/router";

export const ProductIndex = () => (state, actions) => (
  <div>
    <div uk-grid class="uk-grid-medium uk-grid-match uk-flex-center">
      <div>
        ProductIndex
        <Link to="/product">Product</Link>
      </div>
    </div>
  </div>
);
