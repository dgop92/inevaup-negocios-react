import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import EntryList from "./EntryList";
import EntryView from "./EntryView";

export default function BrandRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={EntryList} />
      <Route path={`${path}/view/:id`} children={<EntryView />} />
    </Switch>
  );
}
