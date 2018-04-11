import { h } from "hyperapp";

export const Footer = ({ action }) => (state, actions) => (
  <div class="footer">
    <div class="uk-container uk-text-center uk-position-relative">
      <ul
        uk-margin=""
        class="uk-width-1-1 uk-subnav uk-flex-inline uk-flex-center uk-margin-remove-bottom"
      >
        <li class="uk-width-1-1@s uk-width-1-4@m">
          <a href="mailto:info@suncork.net">
            <span class="six">info@suncork.net</span>
          </a>
        </li>
        <li class="uk-width-1-1@s uk-width-1-2@m">
          <span class="seven">
            &copy; 2018 <span class="one">SUNCORK</span> All Rights Reserved
          </span>
        </li>
        <li class="uk-width-1-1@s uk-width-1-4@m">
          <a href="mailto:kidandcat@gmail.com">
            <span class="six">Developed by kidandcat</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);
