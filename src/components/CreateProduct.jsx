import { h } from "hyperapp";

export const CreateProduct = () => (state, actions) => (
  <div>
    create product
    <button onclick={() => actions.createProduct({ name: "test" })}>
      Create
    </button>
  </div>
);
