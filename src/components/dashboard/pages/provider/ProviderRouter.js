import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import ProviderList from "./ProviderList";
import ProviderView from "./ProviderView";
import { ProviderCreate, ProviderUpdate } from "./ProviderForm";
export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} children={<ProviderList />} />
      <Route path={`${path}/create`} children={<ProviderCreate />} />
      <Route path={`${path}/view/:id`} children={<ProviderView />} />
      <Route path={`${path}/update/:id`} children={<ProviderUpdate />} />
    </Switch>
  );
}