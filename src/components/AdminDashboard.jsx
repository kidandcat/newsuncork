import { h } from "hyperapp";
import { Link } from "@hyperapp/router";
import { SmallProduct } from "/src/components/SmallProduct";
import { CreateProductStepByStep } from "/src/components/CreateProduct";
import { AdminProductList } from "/src/components/AdminProductList";
import { Route, Switch } from "@hyperapp/router";

export const AdminDashboard = () => (state, actions) => (
  <Switch>
    <Route path="/admin" render={Dashboard} />
    <Route
      parent
      path="/admin/product/create"
      render={CreateProductStepByStep}
    />
    <Route parent path="/admin/product/list" render={AdminProductList} />
  </Switch>
);

const Dashboard = () => (state, actions) => (
  <div class="uk-width-1-1 uk-flex admin-dashboard">
    <div
      class="admin-button"
      onclick={() => actions.location.go("/admin/product/create")}
    >
      <span uk-icon="icon: plus-circle; ratio: 3" />
    </div>
    <div
      class="admin-button"
      onclick={() => actions.location.go("/admin/product/list")}
    >
      <span uk-icon="icon: list; ratio: 3" />
    </div>
  </div>
);
