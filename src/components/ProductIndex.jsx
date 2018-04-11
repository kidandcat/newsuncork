import { h } from "hyperapp";
import { Link } from "@hyperapp/router";

export const ProductIndex = () => (state, actions) => (
  <div>
    <div uk-grid class="uk-grid-medium uk-grid-match uk-flex-center">
      <div>
        Products:
        <div>{state.products.map(p => <div>{p.name}</div>)}</div>
        <Link to="/product">Product</Link>
        <button onclick={actions.getProducts}>Get products</button>
        <button onclick={() => actions.createProduct({ name: "ok" })}>
          add product
        </button>
      </div>
    </div>
  </div>
);
