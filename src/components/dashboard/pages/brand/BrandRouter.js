import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BrandList from "./BrandList";
import BrandView from "./BrandView";
import { BrandCreate, BrandUpdate} from "./BrandForm";

export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} children={<BrandList />} />
      <Route path={`${path}/create`} children={<BrandCreate />} />
      <Route path={`${path}/view/:id`} children={<BrandView />} />
      <Route path={`${path}/update/:id`} children={<BrandUpdate />} />
    </Switch>
  );
}
