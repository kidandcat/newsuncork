import { h } from "hyperapp";
import { Link } from "@hyperapp/router";
import { SmallProduct } from "/src/components/SmallProduct";

export const AuthModal = () => (state, actions) => (
  <div class="uk-width-1-2 uk-margin-auto">
    <h2>Login</h2>
    <div class="uk-margin">
      <input class="uk-input" type="text" id="user" />
    </div>
    <div class="uk-margin">
      <input class="uk-input" type="password" id="pass" />
    </div>
    <button
      class="uk-button"
      onclick={() => {
        actions.authenticate({
          user: document.querySelector("#user").value,
          pass: document.querySelector("#pass").value
        });
        actions.location.go(`/admin`);
      }}
    >
      Log in
    </button>
  </div>
);
