import { location } from "@hyperapp/router";
import { getProductByID } from "/src/utils";
import swal from "sweetalert";

export const setupActions = server => ({
  location: location.actions,
  createProduct: v => state => {
    server
      .service("product")
      .create(v)
      .then(() => {
        swal({
          title: "Product created",
          text: "Your new product was successfully created!",
          icon: "success"
        });
      })
      .catch(err => {
        swal({
          title: "Error creating product",
          text: err.message,
          icon: "error"
        });
      });
  },
  deleteProduct: v => (state, actions) => {
    server
      .service("product")
      .remove(v.id)
      .then(() => {
        swal({
          title: "Product removed successfully",
          text: "Your product was removed successfully",
          icon: "success"
        });
        actions.getProducts();
      })
      .catch(err => {
        swal({
          title: "Error removing product",
          text: err.message,
          icon: "error"
        });
      });
  },
  productCreated: v => state => ({
    products: [...state.products, v]
  }),
  addProducts: v => state => ({
    products: v
  }),
  loading: v => state => ({
    loading: v
  }),
  getProducts: () => (state, actions) => {
    actions.loading(true);
    server
      .service("product")
      .find()
      .then(prods => {
        actions.addProducts(prods);
        actions.loading(false);
      })
      .catch(err => {
        swal({
          title: "Error fetching products",
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
