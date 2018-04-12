import { h } from "hyperapp";

export const SmallProduct = ({ click }, Children) => (
  <div
    class="uk-card uk-card-default uk-card-hover uk-card-body"
    style={{
      cursor: "pointer",
      margin: "20px",
      marginTop: "20px"
    }}
    onclick={click}
  >
    {Children}
  </div>
);
