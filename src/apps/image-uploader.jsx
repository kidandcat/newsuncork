import { h, app } from "hyperapp";
import * as Sortable from "sortablejs";

const state = {
  images: []
};

const actions = {
  add: value => state => ({ images: [...state.images, value] }),
  remove: value => state => ({ images: state.images.filter(i => i != value) })
};

const view = (state, actions) => (
  <div class="uk-margin">
    <div uk-form-custom>
      <input onchange={processFile(actions.add)} type="file" />
      <button class="uk-button uk-button-default" type="button" tabindex="-1">
        Add Image
      </button>
    </div>
    <div class="product-create-images" oncreate={el => Sortable.create(el)}>
      {state.images.map(i => <img src={i} />)}
    </div>
  </div>
);

const processFile = add => event => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    add(reader.result);
  };
  reader.onerror = error => {
    console.log("Error: ", error);
  };
};

export const ImageUploaderApp = element => app(state, actions, view, element);
