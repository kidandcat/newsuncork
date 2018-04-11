export const setupListeners = (server, actions) => {
  server.service("product").on("created", product => {
    console.log("Got new product", product);
    actions.productCreated(product);
  });
};
