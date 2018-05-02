import { h } from "hyperapp";
import { Link } from "@hyperapp/router";

export const SideMenu = () => (state, actions) => (
  <div id="side-menu" uk-offcanvas="overlay: true">
    <div class="uk-offcanvas-bar">
      <button
        style={{
          color: "black"
        }}
        class="uk-offcanvas-close"
        type="button"
        uk-close
      />
      <br />
      <ul class="uk-nav-default" uk-nav>
        <li class="uk-active">
          <Link
            to="/"
            // Click body to hide the menu
            onclick={() => document.body.click()}
          >
            Home
          </Link>
        </li>
        {!state.logged && (
          <li class="uk-active">
            <Link
              to="/login"
              // Click body to hide the menu
              onclick={() => document.body.click()}
            >
              Login
            </Link>
          </li>
        )}
        {state.logged && (
          <li>
            <Link
              to="/admin"
              // Click body to hide the menu
              onclick={() => document.body.click()}
            >
              <span class="uk-margin-small-right" uk-icon="cog" />Admin
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>
);
