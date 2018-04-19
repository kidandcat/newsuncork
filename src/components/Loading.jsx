import { h } from "hyperapp";

export const Loading = () => (state, actions) => (
  <div
    style={{
      opacity: state.loading ? 1 : 0,
      pointerEvents: "none"
    }}
    class="loader"
  >
    <div class="spinner-container">
      <div class="spinner">
        <div />
      </div>
      <div class="spinner-text">Loading</div>
    </div>
  </div>
);
