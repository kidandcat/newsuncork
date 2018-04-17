import { h } from "hyperapp";
import Anime from "animejs";

export const ProductInfo = ({ match }) => (state, actions) => {
  if (
    state.activeProduct &&
    state.activeProduct.id === match.params.productID
  ) {
    return (
      <div class="uk-flex">
        <div class="image-viewer">
          <img
            id="activeImage"
            class="uk-width-3-5"
            src={state.activeProduct.images[state.activeImage]}
            alt="big product image"
          />
          <div class="image-array">
            {state.activeProduct.images.map((i, index) => (
              <img
                src={i}
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
        </div>
        <div class="product-info">
          <h2>{state.activeProduct.name}</h2>
          <p>{state.activeProduct.description}</p>
        </div>
      </div>
    );
  } else {
    actions.setActiveProduct(match.params.productID);
    return <div />;
  }
};
