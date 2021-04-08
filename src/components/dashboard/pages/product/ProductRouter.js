import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import { ProductCreate, ProductUpdate } from "./ProductForm";

export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} children={<ProductList />} />
      <Route path={`${path}/create`} children={<ProductCreate />} />
      <Route path={`${path}/view/:id`} children={<ProductView />} />
      <Route path={`${path}/update/:id`} children={<ProductUpdate />} />
    </Switch>
  );
}
