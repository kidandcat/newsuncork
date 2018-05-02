import { h, app } from "hyperapp";
import { ImageUploaderApp } from "/src/apps/image-uploader";
import { Route, Switch, location } from "@hyperapp/router";

let createProductBasePath;
let createProductAction;

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
        path={`${createProductBasePath}/${steps.basicInfo}`}
        render={BasicInfo}
        who="product-creator"
      />
      <Route
        basepath={createProductBasePath}
        path={`${createProductBasePath}/${steps.images}`}
        render={Images}
        who="product-creator"
      />
      <Route
        basepath={createProductBasePath}
        path={`${createProductBasePath}/${steps.options}`}
        render={Options}
        who="product-creator"
      />
    </Switch>
  </div>
);

const gatherData = (product, type) => ({ target: { value } }) => {
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
    {stepButtons(null, { path: steps.images })}
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
    {stepButtons(
      {
        path: steps.basicInfo,
        func: () => gatherImages(state.product)
      },
      {
        path: steps.options,
        func: () => gatherImages(state.product)
      }
    )}
  </div>
);

const Options = () => (state, actions) => (
  <div>
    options
    {stepButtons(
      { path: steps.images },
      {
        path: "/",
        func: () => {
          createProductAction(state.product);
        }
      }
    )}
  </div>
);

const stepButtons = (previous, next) => (state, actions) => (
  <div class="uk-margin-auto">
    <div class="uk-button-group uk-float-right">
      {previous !== null && (
        <button
          class="uk-button uk-button-default"
          onclick={() => {
            previous.func && previous.func();
            actions.createProductNextStep(previous.path);
          }}
        >
          Previous
        </button>
      )}
      {next !== null && (
        <button
          class="uk-button uk-button-primary"
          onclick={() => {
            next.func && next.func();
            actions.createProductNextStep(next.path);
          }}
        >
          Next
        </button>
      )}
    </div>
  </div>
);

export const ProductCreatorApp = ({ path, container, createProduct }) => {
  createProductBasePath = path;
  createProductAction = createProduct;
  const ap = app(state, actions, view, container);
  location.subscribe(ap.location, true);
  return ap;
};
