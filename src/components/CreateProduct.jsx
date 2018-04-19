import { h } from "hyperapp";
import { ImageUploaderApp } from "/src/apps/image-uploader";

export const CreateProduct = () => (state, actions) => (
  <div>
    <div class="uk-form-width-large">
      <fieldset class="uk-fieldset">
        <div class="uk-margin">
          <input
            class="uk-input uk-width-1-6 uk-margin-right"
            oninput={gatherData("id")}
            type="text"
            placeholder="ID"
          />
          <input
            class="uk-input uk-width-3-4 uk-margin-left"
            oninput={gatherData("name")}
            type="text"
            placeholder="Name"
          />
        </div>
        <div class="uk-margin">
          <label htmlFor="description">Description</label>
          <textarea
            rows="10"
            class="uk-textarea"
            name="description"
            oninput={gatherData("description")}
          />
        </div>
      </fieldset>
      <div
        oncreate={elem => (ImageUploaderInstance = ImageUploaderApp(elem))}
      />
      <button
        class="uk-button uk-button-default"
        onclick={() => {
          gatherImages();
          actions.createProduct(product);
          actions.location.go(`/`);
        }}
      >
        Create
      </button>
    </div>
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
