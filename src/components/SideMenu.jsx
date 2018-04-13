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
      <ul class="uk-nav uk-nav-default" uk-nav>
        <li class="uk-active">
          <a href="/">Home</a>
        </li>
        <li class="uk-parent uk-preserve-color">
          <a>
            Admin<span class="uk-float-right" uk-icon="icon: chevron-down" />
          </a>
          <ul class="uk-nav-sub">
            <li>
              <a href="/admin/product/create">
                <span class="uk-margin-small-right" uk-icon="icon: plus" />Create
                Product
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);
