import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import NotFound from "./components/base/NotFound";
import Home from "./components/base/Home";
import Login from "./components/base/Login";

import Dashboard from "./components/dashboard/Dashboard";

export default function RouterSetup() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
