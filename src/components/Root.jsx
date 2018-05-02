import { h } from "hyperapp";
import { Header } from "/src/components/Header";
import { Footer } from "/src/components/Footer";
import { ProductInfo } from "/src/components/ProductInfo";
import { ProductIndex } from "/src/components/ProductIndex";
import { CreateProduct } from "/src/components/CreateProduct";
import { SideMenu } from "/src/components/SideMenu";
import { AuthModal } from "/src/components/AuthModal";
import { Loading } from "/src/components/Loading";
import { AdminDashboard } from "/src/components/AdminDashboard";
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
          <Route path="/product/:productID" render={ProductInfo} />
          <Route parent path="/admin" render={AdminDashboard} />
          <Route path="/login" render={AuthModal} />
        </Switch>
      </div>
      <Footer />
      <SideMenu />
      <Loading />
    </div>
  </div>
);
