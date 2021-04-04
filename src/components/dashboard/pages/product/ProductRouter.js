import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import ProductList from "./ProductList";
import ProductView from "./ProductView";

export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} children={<ProductList />}/>
      <Route path={`${path}/create`} children={<div>Create product</div>}/>
      <Route path={`${path}/view/:id`} children={<ProductView />} />
      <Route path={`${path}/update/:id`} children={<div>Update product</div>}/>
    </Switch>
  );
}
