import { h, app } from "hyperapp";

const state = {
  count: 0
};

const actions = {
  down: value => state => ({ count: state.count - value }),
  up: value => state => ({ count: state.count + value })
};

const view = (state, actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
    <div class="uk-margin">
      <div uk-form-custom>
        <input type="file" />
        <button class="uk-button uk-button-default" type="button" tabindex="-1">
          Select
        </button>
      </div>
    </div>
  </div>
);

export const ImageUploaderApp = element => app(state, actions, view, element);
