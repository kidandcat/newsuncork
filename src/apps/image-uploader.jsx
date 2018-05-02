import { h, app } from "hyperapp";
import Sortable from "sortablejs";
import Cropper from "cropperjs";

const state = {
  images: [],
  activeImageIndex: null
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
  remove: value => state => ({ images: state.images.filter(i => i != value) })
};

let activeCropper;

const view = (state, actions) => (
  <div class="uk-margin">
    <div uk-form-custom>
      <input onchange={processFile(state, actions)} type="file" />
      <button class="uk-button uk-button-default" type="button" tabindex="-1">
        Add Image
      </button>
    </div>
    <div class="product-create-images" oncreate={el => Sortable.create(el)}>
      {state.images.map(i => (
        <div>
          <button
            class="uk-button uk-button-primary"
            style={{
              width: "100%"
            }}
            onclick={event => {
              const data = activeCropper
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

              actions.replace([state.activeImageIndex, data]);
              activeCropper.destroy();
              activeCropper = null;
              event.target.style.display = "none";
            }}
            type="button"
          >
            Done
          </button>
          <img
            src={i}
            oncreate={el => {
              activeCropper = new Cropper(el, {
                aspectRatio: 1 / 1,
                minContainerHeight: 600,
                autoCrop: false,
                zoomable: false
              });
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

const processFile = (state, actions) => event => {
  if (activeCropper) {
    const img = activeCropper.element;
    activeCropper.destroy();
    actions.remove(img.src);
  }
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    actions.add(reader.result);
  };
  reader.onerror = error => {
    console.log("Error: ", error);
  };
};

export const ImageUploaderApp = container =>
  app(state, actions, view, container);
