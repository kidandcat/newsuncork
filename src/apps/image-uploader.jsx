import { h, app } from "hyperapp";
import Sortable from "sortablejs";
import Cropper from "cropperjs";

const state = {
  images: [],
  activeImageIndex: null,
  activeCropper: null
};

const actions = {
  add: value => (state, actions) => {
    const res = { images: [...state.images, value] };
    res.activeImageIndex = res.images.indexOf(value);
    return res;
  },
  replace: value => state => {
    const images = state.images;
    images[value[0]] = value[1];
    return {
      images: images
    };
  },
  remove: value => state => ({ images: state.images.filter(i => i != value) }),
  activeCropper: value => state => ({ activeCropper: value })
};

const view = (state, actions) => (
  <div class="uk-margin">
    <div uk-form-custom>
      <input onchange={processFile(actions.add)} type="file" />
      <button class="uk-button uk-button-default" type="button" tabindex="-1">
        Add Image
      </button>
    </div>
    <div class="product-create-images" oncreate={el => Sortable.create(el)}>
      {state.images.map(i => (
        <div>
          <img
            src={i}
            oncreate={el => {
              actions.activeCropper(
                new Cropper(el, {
                  aspectRatio: 1 / 1,
                  minContainerHeight: 600,
                  autoCrop: false,
                  zoomable: false
                })
              );
            }}
          />
          <button
            class="uk-button uk-button-default"
            onclick={event => {
              const data = state.activeCropper
                .getCroppedCanvas({
                  minWidth: 100,
                  minHeight: 100,
                  maxWidth: 4096,
                  maxHeight: 4096,
                  fillColor: "#fff",
                  imageSmoothingEnabled: false,
                  imageSmoothingQuality: "high"
                })
                .toDataURL("image/jpeg");
              state.activeCropper.destroy();
              actions.replace([state.activeImageIndex, data]);
              event.target.style.display = "none";
            }}
            type="button"
          >
            Done
          </button>
        </div>
      ))}
    </div>
  </div>
);

const processFile = add => event => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    add(reader.result);
  };
  reader.onerror = error => {
    console.log("Error: ", error);
  };
};

export const ImageUploaderApp = element => app(state, actions, view, element);
