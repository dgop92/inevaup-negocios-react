import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

export default function Dashboard() {
  let { path } = useRouteMatch();

  return (
    <>
      <div>Header</div>
      <div>Sidebar</div>
      <Switch>
        <Route exact path={path}>
          <div> Dashboard Home </div>
        </Route>
        <Route path={`${path}/brands`}>
          <div> Dashboard brands </div>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}
