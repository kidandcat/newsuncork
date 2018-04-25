import { h, app } from "hyperapp";
import { ImageUploaderApp } from "/src/apps/image-uploader";
import { Route, Switch, location } from "@hyperapp/router";

let createProductBasePath = "";

const steps = {
  basicInfo: "",
  images: "images",
  options: "options"
};

const state = {
  location: location.state,
  product: {}
};

const actions = {
  location: location.actions,
  createProductNextStep: val => (state, actions) => {
    actions.location.go(`${createProductBasePath}/${val}`);
  }
};

const view = (state, actions) => (
  <div key="productCreatorApp">
    <Switch>
      <Route
        basepath={createProductBasePath}
        path={`${steps.basicInfo}`}
        render={BasicInfo}
        who="product-creator"
      />
      <Route
        basepath={createProductBasePath}
        path={`${steps.images}`}
        render={Images}
        who="product-creator"
      />
      <Route
        basepath={createProductBasePath}
        path={`${steps.options}`}
        render={Options}
        who="product-creator"
      />
    </Switch>
  </div>
);

const gatherData = (type, product) => ({ target: { value } }) => {
  product[type] = value;
};

const gatherImages = product => {
  const imgs = document.querySelectorAll(".product-create-images img");
  state.product.images = [];
  for (let i of imgs) {
    state.product.images.push(i.getAttribute("src"));
  }
  return true;
};

const BasicInfo = () => (state, actions) => (
  <div>
    <fieldset class="uk-fieldset">
      <div class="uk-margin">
        <input
          class="uk-input uk-width-1-6 uk-margin-right"
          oninput={gatherData(state.product, "id")}
          type="text"
          placeholder="ID"
        />
        <input
          class="uk-input uk-width-3-4 uk-margin-left"
          oninput={gatherData(state.product, "name")}
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
          oninput={gatherData(state.product, "description")}
        />
      </div>
    </fieldset>
    {stepButtons(null, steps.images)}
  </div>
);

const Images = () => (state, actions) => (
  <div>
    <div
      key="unique"
      oncreate={elem => {
        ImageUploaderApp(elem);
      }}
    />
    {stepButtons(steps.basicInfo, steps.options)}
  </div>
);

const Options = () => (state, actions) => (
  <div>
    options
    {stepButtons(steps.images, steps.basicInfo)}
  </div>
);

const stepButtons = (previous, next) => (state, actions) => (
  <div class="uk-margin-auto">
    <div class="uk-button-group uk-float-right">
      {previous !== null && (
        <button
          class="uk-button uk-button-default"
          onclick={() => {
            gatherImages(state.product);
            actions.createProductNextStep(previous);
          }}
        >
          Previous
        </button>
      )}
      {next !== null && (
        <button
          class="uk-button uk-button-primary"
          onclick={() => {
            gatherImages(state.product);
            actions.createProductNextStep(next);
          }}
        >
          Next
        </button>
      )}
    </div>
  </div>
);

export const ProductCreatorApp = ({ path, container }) => {
  createProductBasePath = path;
  const ap = app(state, actions, view, container);
  location.subscribe(ap.location);
  return ap;
};
