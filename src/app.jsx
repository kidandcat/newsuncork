import { app } from "hyperapp";
import { Root } from "/src/components/Root";
import { location } from "@hyperapp/router";
import "./css/base.css";

// State
const state = {
  count: 0,
  location: location.state
};

// Actions
const actions = {
  location: location.actions,
  down: v => state => ({ count: state.count - v }),
  up: v => state => ({ count: state.count + v }),
  adown: v => (state, actions) => setTimeout(() => actions.down(v), 1000),
  aup: v => (state, actions) => setTimeout(() => actions.up(v), 1000)
};

// Render
const main = app(state, actions, Root, document.body);

const unsubscribe = location.subscribe(main.location);
