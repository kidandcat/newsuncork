import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import io from "socket.io-client";

let socket;
if (window.location.hostname === "localhost") {
  socket = io("localhost:3030");
} else if (window.location.hostname === "10.114.146.70") {
  socket = io("10.114.146.70:3030");
} else {
  socket = io();
}
const server = feathers();
server.configure(socketio(socket, { timeout: 25000 }));
server.configure(
  auth({
    storage: window.localStorage
  })
);

export default server;
