export const setupListeners = (server, actions) => {
  server.service("product").on("created", product => {
    actions.productCreated(product);
  });
  server.service("product").on("patched", product => {
    actions.getService("product");
  });
  server.service("optiontype").on("created", option => {
    console.log("option created", option);
    actions.optionCreated(option);
  });
  server.service("optiontype").on("patched", option => {
    actions.getService("optiontype");
  });
};
