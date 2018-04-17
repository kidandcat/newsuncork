import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";

//const socket = io("localhost:3030");
const socket = io();
const server = feathers();
server.configure(socketio(socket));

export default server;
