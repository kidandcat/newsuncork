import { h } from "hyperapp";
import { Header } from "/src/components/Header";
import { Footer } from "/src/components/Footer";
import { ProductInfo } from "/src/components/ProductInfo";
import { ProductIndex } from "/src/components/ProductIndex";
import { CreateProduct } from "/src/components/CreateProduct";
import { Route, Switch } from "@hyperapp/router";

// View
export const Root = (state, actions) => (
  <div>
    <Header />
    <div
      class="uk-container"
      style={{
        minHeight: "calc(100vh - 169px)"
      }}
    >
      <Switch>
        <Route path="/" render={ProductIndex} />
        <Route path="/product" render={ProductInfo} />
        <Route path="/admin/product/create" render={CreateProduct} />
      </Switch>
    </div>
    <Footer />
  </div>
);
