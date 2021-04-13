import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useApiUtils } from "./APIUtils";

function PrivateRoute({ component: Component, ...rest }) {
  const { authToken } = useApiUtils();
  
  return (
    <Route
      {...rest}
      render={props =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;