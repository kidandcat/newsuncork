import { h } from "hyperapp";

export const CreateProduct = () => (state, actions) => (
  <div>
    {state.products}
    create product
    <button onclick={() => createProduct("test")}>Create</button>
  </div>
);
