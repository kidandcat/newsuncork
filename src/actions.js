import { location } from "@hyperapp/router";
import { getProductByID } from "/src/utils";
import swal from "sweetalert";

export const setupActions = server => ({
  location: location.actions,
  async: v => state => v,
  modify: ({ id, data, service }) => state => {
    server
      .service(service)
      .patch(id, data)
      .then(() => {
        swal({
          title: `${service} modified`,
          text: `Your ${service} was successfully modified!`,
          icon: "success"
        });
      })
      .catch(err => {
        swal({
          title: `Error modifying ${service}`,
          text: err.message,
          icon: "error"
        });
      });
  },
  create: ({ service, data }) => state => {
    server
      .service(service)
      .create(data)
      .then(() => {
        swal({
          title: `${service} created`,
          text: `Your new ${service} was successfully created!`,
          icon: "success"
        });
      })
      .catch(err => {
        swal({
          title: `Error creating ${service}`,
          text: err.message,
          icon: "error"
        });
      });
  },
  delete: ({ service, id }) => (state, actions) => {
    server
      .service(service)
      .remove(id)
      .then(() => {
        swal({
          title: `${service} removed successfully`,
          text: `Your ${service} was removed successfully`,
          icon: "success"
        });
        actions.getService("product");
      })
      .catch(err => {
        swal({
          title: `Error removing ${service}`,
          text: err.message,
          icon: "error"
        });
      });
  },
  productCreated: v => (state, actions) => {
    setTimeout(() => actions.fetchImages(), 1000);
    return {
      products: [...state.products, v]
    };
  },
  optionCreated: v => (state, actions) => {
    return {
      optiontypes: [...state.optiontypes, v]
    };
  },
  addImage: ({ index, data }) => state => {
    const a = state.images;
    a[index] = data;
    return {
      images: a
    };
  },
  fetchImages: () => (state, actions) => {
    for (let product in state.products) {
      for (let image in state.products[product].images) {
        server
          .service("images")
          .get(state.products[product].images[image])
          .then(data => {
            actions.addImage({
              index: state.products[product].images[image],
              data: data.data
            });
          });
      }
    }
  },
  loading: v => state => ({ loading: v }),
  getService: service => (state, actions) => {
    actions.loading(true);
    server
      .service(service)
      .find()
      .then(res => {
        actions.async({
          [`${service}s`]: res
        });
        actions.loading(false);
        actions.fetchImages();
      })
      .catch(err => {
        swal({
          title: `Error fetching ${service}s`,
          text: err.message,
          icon: "error"
        });
        actions.loading(false);
      });
  },
  setActiveProduct: id => (state, actions) => {
    const prod = getProductByID(state.products, id);
    return {
      activeProduct: getProductByID(state.products, id)
    };
  },
  setActiveImage: index => (state, actions) => ({
    activeImage: index
  }),
  logged: val => (state, actions) => ({
    logged: val
  }),
  checkAuthentication: () => (state, actions) => {
    server
      .authenticate()
      .then(() => actions.logged(true))
      .catch(err => actions.logged(false));
  },
  authenticate: ({ user, pass }) => (state, actions) => {
    server
      .authenticate({
        strategy: "local",
        email: user,
        password: pass
      })
      .then(res => {
        swal({
          title: "Logged In",
          text: "You logged in sucessfully, check the side menu",
          icon: "success"
        });
        actions.logged(true);
      })
      .catch(res => {
        swal({
          title: "Logged In",
          text: res.message,
          icon: "warning"
        });
        actions.logged(false);
      });
  }
});
