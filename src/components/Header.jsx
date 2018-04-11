import { h } from "hyperapp";
import { Link } from "@hyperapp/router";

export const Header = ({ action }) => (state, actions) => (
  <div
    onclick={() => {
      actions.location.go("/");
    }}
  >
    <nav uk-navbar class="navbar uk-navbar-container uk-navbar-transparent">
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <a class="cart-link" href="/cart">
              <span uk-icon="icon: cart; ratio: 0.7" />
            </a>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-center">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <a href="/">
              <img
                style={{
                  maxHeight: "170px"
                }}
                src="/assets/logo.png"
                alt="logo"
              />
            </a>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li>
            <a href="/language?lang=es">ES</a>
          </li>
          <li>
            <a href="/language?lang=en">EN</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
