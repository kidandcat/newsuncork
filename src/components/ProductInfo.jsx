import { h } from "hyperapp";
import Anime from "animejs";

export const ProductInfo = ({ match }) => (state, actions) => {
  if (
    state.activeProduct &&
    state.activeProduct.id === match.params.productID
  ) {
    return (
      <div class="uk-flex product-info-container">
        <div class="image-viewer uk-margin-auto uk-width-3-4@m">
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
          <div class="uk-margin-auto">
            <img
              id="activeImage"
              class="uk-margin-auto"
              src={state.activeProduct.images[state.activeImage]}
              alt="big product image"
            />
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
