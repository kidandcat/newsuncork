import { h } from "hyperapp";

export const SmallProduct = ({ click, remove, logged }, Children) => (
  <div
    class="uk-card uk-card-default uk-card-hover uk-card-body index-image"
    onclick={click}
  >
    {Children}
    {logged && (
      <span
        uk-icon="icon: trash"
        class="delete-button"
        onclick={event => {
          event.stopPropagation();
          event.preventDefault();
          remove();
        }}
      />
    )}
  </div>
);
