import { app } from "hyperapp";
import { Root } from "/src/components/Root";
import { setupActions } from "/src/actions";
import { setupListeners } from "/src/listeners";
import { location } from "@hyperapp/router";
import { state } from "/src/state";
import server from "/src/server";
import "./css/base.css";

const actions = setupActions(server);
const main = app(state, actions, Root, document.body);
const unsubscribe = location.subscribe(main.location);
load(main);

function load(actions) {
  setupListeners(server, main);
  actions.getProducts();
  actions.checkAuthentication();
}
