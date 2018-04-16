import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";

const socket = io(`${window.location.hostname}:80`);
const server = feathers();
server.configure(socketio(socket));

export default server;
