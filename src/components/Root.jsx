import { h } from "hyperapp";
import { Header } from "/src/components/Header";
import { Footer } from "/src/components/Footer";
import { ProductInfo } from "/src/components/ProductInfo";
import { ProductIndex } from "/src/components/ProductIndex";
import { CreateProduct } from "/src/components/CreateProduct";
import { SideMenu } from "/src/components/SideMenu";
import { Route, Switch } from "@hyperapp/router";

// View
export const Root = (state, actions) => (
  <div>
    <div class="uk-offcanvas-content">
      <Header />
      <div
        class="uk-container"
        uk-height-viewport="offset-top: true; offset-bottom: true"
      >
        <Switch>
          <Route path="/" render={ProductIndex} />
          <Route path="/product" render={ProductInfo} />
          <Route path="/admin/product/create" render={CreateProduct} />
        </Switch>
      </div>
      <Footer />
      <SideMenu />
    </div>
  </div>
);
