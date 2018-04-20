import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import io from "socket.io-client";

let socket;
if (window.location.hostname === "localhost") {
  socket = io("localhost:3030");
} else {
  socket = io("suncork.net:3030");
}
const server = feathers();
server.configure(socketio(socket, { timeout: 25000 }));
server.configure(
  auth({
    storage: window.localStorage
  })
);

export default server;
