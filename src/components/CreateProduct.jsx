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
    </form>
    <div oncreate={elem => (ImageUploaderInstance = ImageUploaderApp(elem))} />
    <button onclick={() => actions.createProduct(product)}>Create</button>
  </div>
);

const product = {};
let ImageUploaderInstance;

const gatherData = type => ({ target: { value } }) => {
  product[type] = value;
};
