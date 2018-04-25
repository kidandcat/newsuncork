---
to: src/apps/<%=name%>.jsx
---
import { h, app } from "hyperapp";

const state = {

};

const actions = {
  action: value => (state, actions) => ({
      stateprop: true
  })
};

const view = (state, actions) => (
    <div>view</div>
);

export const <%=name%>App = container =>
  app(state, actions, view, container);
