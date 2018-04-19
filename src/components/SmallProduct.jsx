import { h } from "hyperapp";

export const SmallProduct = ({ click, remove, logged }, Children) => (
  <div
    class="uk-card uk-card-default uk-card-hover uk-card-body"
    style={{
      cursor: "pointer",
      margin: "20px",
      marginTop: "20px",
      maxHeight: "300px",
      maxWidth: "300px"
    }}
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
