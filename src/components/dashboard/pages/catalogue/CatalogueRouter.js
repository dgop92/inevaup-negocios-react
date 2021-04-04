import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import CatalogueList from "./CatalogueList";
import CatalogueView from "./CatalogueView";

export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} children={<CatalogueList />} />
      <Route path={`${path}/create`} children={<div>Create catalogue</div>} />
      <Route path={`${path}/view/:id`} children={<CatalogueView />} />
      <Route
        path={`${path}/update/:id`}
        children={<div>Update catalogue</div>}
      />
    </Switch>
  );
}
