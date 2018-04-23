import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import rest from "@feathersjs/rest-client";
import io from "socket.io-client";
import { isMobile } from "/src/utils";

let socket;
let restClient;
if (window.location.hostname === "localhost") {
  socket = io("localhost:3030");
  restClient = rest("http://localhost:3030");
} else if (window.location.hostname === "10.114.146.70") {
  socket = io("10.114.146.70:3030");
  restClient = rest("http://10.114.146.70:3030");
} else {
  socket = io();
  restClient = rest("/api");
}
const server = feathers();
if (isMobile()) {
  server.configure(restClient.fetch(window.fetch));
} else {
  server.configure(socketio(socket, { timeout: 25000 }));
}
server.configure(
  auth({
    storage: window.localStorage
  })
);

export default server;
