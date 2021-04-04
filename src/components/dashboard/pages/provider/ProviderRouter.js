import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import ProviderList from "./ProviderList";
import ProviderView from "./ProviderView";

export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} children={<ProviderList />}/>
      <Route path={`${path}/create`} children={<div>Create proveedor</div>}/>
      <Route path={`${path}/view/:id`} children={<ProviderView />}/>
      <Route path={`${path}/update/:id`} children={<div>Update proveedor</div>}/>
    </Switch>
  );
}