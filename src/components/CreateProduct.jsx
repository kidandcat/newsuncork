import { h } from "hyperapp";
import { ImageUploaderApp } from "/src/apps/image-uploader";

export const CreateProduct = () => (state, actions) => (
  <div>
    <form class="uk-form-width-large">
      <fieldset class="uk-fieldset">
        <div class="uk-margin">
          <input
            class="uk-input"
            oninput={gatherData("name")}
            type="text"
            placeholder="Name"
          />
        </div>
        <div class="uk-margin">
          <input
            class="uk-input"
            oninput={gatherData("description")}
            type="text"
            placeholder="Description"
          />
        </div>
      </fieldset>
      <div
        oncreate={elem => (ImageUploaderInstance = ImageUploaderApp(elem))}
      />
      <button onclick={() => gatherImages() && actions.createProduct(product)}>
        Create
      </button>
    </form>
  </div>
);

const product = {};
let ImageUploaderInstance;

const gatherData = type => ({ target: { value } }) => {
  product[type] = value;
};

const gatherImages = () => {
  const imgs = document.querySelectorAll(".product-create-images img");
  product.images = [];
  for (let i of imgs) {
    product.images.push(i.getAttribute("src"));
  }
  return true;
};
