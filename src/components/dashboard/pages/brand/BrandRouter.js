import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BrandList from "./BrandList";
import BrandView from "./BrandView";

export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} children={<BrandList />}/>
      <Route path={`${path}/create`} children={<div>Create brand</div>}/>
      <Route path={`${path}/view/:id`} children={<BrandView />}/>
      <Route path={`${path}/update/:id`} children={<div>Update Brand</div>}/>
    </Switch>
  );
}
