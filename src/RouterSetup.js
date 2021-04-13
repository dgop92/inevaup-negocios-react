import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import NotFound from "./components/htppErrors/NotFound";
import Home from "./components/base/Home";
import Login from "./components/base/Login";
import InternalError from "./components/htppErrors/InternalError";
import Dashboard from "./components/dashboard/Dashboard";
import Forbbiden from "./components/htppErrors/Forbbiden";
import NoAuthentication from "./components/htppErrors/NoAuthentication";
import PageNotFound from "./components/base/PageNotFound";
import { useApiUtils } from "./authentication/APIUtils";

export default function RouterSetup() {
  const { httpStatus } = useApiUtils();
  return (
    <Router>
      {httpStatus ? (
        <React.Fragment>
          <Route path="/errors" component={HttpError} />
          <Redirect to={`/errors/${httpStatus}`} />
        </React.Fragment>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      )}
    </Router>
  );
}

function HttpError() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/500`} component={InternalError} />
      <Route path={`${path}/404`} component={NotFound} />
      <Route path={`${path}/403`} component={Forbbiden} />
      <Route path={`${path}/401`} component={NoAuthentication} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
