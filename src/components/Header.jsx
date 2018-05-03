import { h } from "hyperapp";
import { Link } from "@hyperapp/router";
import logo from "../assets/logo.png";

export const Header = () => (state, actions) => (
  <div>
    <nav
      id="navbar"
      uk-navbar
      class="navbar uk-navbar-container uk-navbar-transparent uk-navbar-sticky"
    >
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <div
              class="menu-icon"
              onclick={() =>
                UIkit.offcanvas(document.querySelector("#side-menu"), {
                  container: false
                }).show()
              }
            >
              <span uk-icon="icon: menu; ratio: 1.5" />
            </div>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-center">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <a>
              <img
                onclick={() => {
                  actions.location.go("/");
                }}
                class="logo"
                src={logo}
                alt="logo"
              />
            </a>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li class="uk-active cart">
            <a class="cart-link" href="/cart">
              <span uk-icon="icon: cart; ratio: 1.5" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
