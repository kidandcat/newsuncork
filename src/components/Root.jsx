import { h } from "hyperapp";
import { Header } from "/src/components/Header";
import { Footer } from "/src/components/Footer";
import { ProductInfo } from "/src/components/ProductInfo";
import { ProductIndex } from "/src/components/ProductIndex";
import { Route, Switch } from "@hyperapp/router";

// View
export const Root = (state, actions) => (
  <div>
    <Header />
    <div class="uk-container">
      <Switch>
        <Route path="/" render={ProductIndex} />
        <Route path="/product" render={ProductInfo} />
      </Switch>
    </div>
    <Footer />
  </div>
);
