export const setupListeners = (server, actions) => {
  server.service("product").on("create", product => {
    actions.productCreated(product);
  });
};
