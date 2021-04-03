import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BrandList from "./BrandList";
import BrandView from "./BrandView";

export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <BrandList />
      </Route>
      <Route path={`${path}/create`}>
        <div>Create brand</div>
      </Route>
      <Route path={`${path}/view/:id`}>
        <BrandView />
      </Route>
      <Route path={`${path}/update/:id`}>
        <div>Update Brand</div>
      </Route>
    </Switch>
  );
}
