import { h } from "hyperapp";
import { Link } from "@hyperapp/router";
import { SmallProduct } from "/src/components/SmallProduct";

export const ProductIndex = () => (state, actions) => (
  <div>
    <div>
      <div uk-grid class="uk-grid-medium uk-grid-match uk-flex-center">
        {state.products.map(p => (
          <SmallProduct click={() => actions.location.go("/product")}>
            <img src={p.images[0]} alt={p.name} />
          </SmallProduct>
        ))}
      </div>
      {actions.getProducts()}
    </div>
  </div>
);
