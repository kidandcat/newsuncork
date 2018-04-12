import { h } from "hyperapp";

export const CreateProduct = () => (state, actions) => (
  <div>
    create product
    <button onclick={() => createProduct("test")}>Create</button>
  </div>
);
