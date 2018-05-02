import { h } from "hyperapp";
import Anime from "animejs";

export const ProductInfo = ({ match }) => (state, actions) => {
  if (
    state.activeProduct &&
    state.activeProduct.id === match.params.productID
  ) {
    return (
      <div class="uk-flex product-info-container">
        <div class="image-viewer uk-margin-auto uk-width-1-1@s uk-width-3-4@m">
          <div class="image-array">
            {state.activeProduct.images.map((i, index) => (
              <img
                src={state.images[i] || state.defaultImage}
                class={index == state.activeImage ? "active-small" : ""}
                onclick={() => {
                  Anime({
                    targets: "#activeImage",
                    opacity: [1, 0],
                    duration: 250,
                    easing: "linear",
                    complete: () => {
                      actions.setActiveImage(index);
                      Anime({
                        targets: "#activeImage",
                        opacity: [0, 1],
                        duration: 250,
                        easing: "linear"
                      });
                    }
                  });
                }}
                alt="small product image"
              />
            ))}
          </div>
          <div class="uk-margin-auto">
            <img
              id="activeImage"
              class="uk-margin-auto"
              src={
                state.images[state.activeProduct.images[state.activeImage]] ||
                state.defaultImage
              }
              alt="big product image"
            />
          </div>
        </div>
        <div class="product-info">
          <h2>{state.activeProduct.name}</h2>
          <pre>{state.activeProduct.description}</pre>
        </div>
      </div>
    );
  } else {
    actions.setActiveProduct(match.params.productID);
    return <div />;
  }
};
