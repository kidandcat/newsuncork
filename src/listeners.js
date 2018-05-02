export const setupListeners = (server, actions) => {
  server.service("product").on("created", product => {
    actions.productCreated(product);
  });
  server.service("product").on("patched", product => {
    actions.getProducts();
  });
};
