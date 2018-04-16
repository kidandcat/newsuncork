import { h } from "hyperapp";

export const ProductInfo = ({ match }) => (state, actions) => {
  if (
    state.activeProduct &&
    state.activeProduct.id === match.params.productID
  ) {
    return (
      <div class="uk-flex">
        <div class="image-viewer">
          <img
            class="uk-width-3-4"
            src={state.activeProduct.images[0]}
            alt="big product image"
          />
          <div class="image-array">
            {state.activeProduct.images.map(i => (
              <img src={i} alt="small product image" />
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
