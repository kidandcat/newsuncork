import { h } from "hyperapp";
import { Link } from "@hyperapp/router";
import { SmallProduct } from "/src/components/SmallProduct";

export const AuthModal = () => (state, actions) => (
  <div id="login" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Login</h2>
      <input class="uk-input" type="text" id="user" />
      <input class="uk-input" type="password" id="pass" />
      <button
        class="uk-button uk-modal-close"
        onclick={() => {
          actions.authenticate({
            user: document.querySelector("#user").value,
            pass: document.querySelector("#pass").value
          });
        }}
      >
        Log in
      </button>
    </div>
  </div>
);
