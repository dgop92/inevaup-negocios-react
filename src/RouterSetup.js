import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import Home from "./components/base/Home";
import Login from "./components/base/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorPage from "./components/base/ErrorPage";
import { useApiUtils } from "./authentication/APIUtils";

const errorRoutes = [
  {
    path: "/500",
    compProps: {
      title: "500",
      subTitle: "Error interno en el servidor",
    },
  },
  {
    path: "/405",
    compProps: {
      title: "405",
      subTitle: "Acción no disponible",
    },
  },
  {
    path: "/404",
    compProps: {
      title: "404",
      subTitle: "Recurso no encontrado",
    },
  },
  {
    path: "/403",
    compProps: {
      title: "403",
      subTitle: "Sin permiso para acceder a esta página",
    },
  },
  {
    path: "/401",
    compProps: {
      title: "401",
      subTitle: "Sin autorización",
    },
  },
];

export default function RouterSetup() {
  const { httpStatus } = useApiUtils();
  return (
    <Router>
      {httpStatus ? (
        <Switch>
          <Route path="/errors" component={HttpError} />
          <Redirect to={`/errors/${httpStatus}`} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      )}
    </Router>
  );
}

function HttpError() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      {errorRoutes.map((errorRoute, i) => (
        <Route key={i} path={`${path}${errorRoute.path}`}>
          <ErrorPage {...errorRoute.compProps} />
        </Route>
      ))}
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
}
