import { h } from "hyperapp";
import { Link } from "@hyperapp/router";
import { SmallProduct } from "/src/components/SmallProduct";

export const ProductIndex = () => (state, actions) => (
  <div>
    <div>
      <div
        uk-grid
        class="uk-grid-medium uk-grid-match uk-flex-center index-container"
      >
        {state.products.map(p => (
          <SmallProduct
            click={() => actions.location.go(`/product/${p.id}`)}
            remove={() => {
              actions.delete({ id: p.id, service: "product" });
            }}
            logged={state.logged}
          >
            <img
              src={state.images[p.images[0]] || state.defaultImage}
              alt={p.name}
            />
          </SmallProduct>
        ))}
      </div>
    </div>
  </div>
);
