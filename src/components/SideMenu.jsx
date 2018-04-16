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
        <li class="uk-parent uk-preserve-color">
          <a>
            Admin<span class="uk-float-right" uk-icon="chevron-down" />
          </a>
          <ul class="uk-nav-sub">
            <li>
              <Link
                to="/admin/product/create"
                // Click body to hide the menu
                onclick={() => document.body.click()}
              >
                <span class="uk-margin-small-right" uk-icon="plus" />Create
                Product
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);
