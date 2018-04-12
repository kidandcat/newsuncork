import { h } from "hyperapp";
import { Link } from "@hyperapp/router";

export const SideMenu = () => (state, actions) => (
  <div id="side-menu" uk-offcanvas="overlay: true">
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" uk-close />
      <ul class="uk-nav uk-nav-default">
        <li class="uk-active">
          <a href="#">Active</a>
        </li>
        <li class="uk-parent uk-preserve-color">
          <a href="#">Parent</a>
          <ul class="uk-nav-sub">
            <li>
              <a href="#">
                <span class="uk-margin-small-right" uk-icon="icon: table" />Sub
                item
              </a>
            </li>
            <li>
              <a href="#">
                <span class="uk-margin-small-right" uk-icon="icon: table" />Sub
                item
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);
