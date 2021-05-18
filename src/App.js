import React from "react";
import RouterSetup from "./RouterSetup";
import { theme } from "./constants/materialUI";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "use-http";
import { APIContext, useApiWithAuthToken } from "./authentication/APIUtils";
import { SnackbarProvider } from "notistack";

export default function App() {
  const { authToken, setAuthToken, globalFetchOptions, httpStatus } =
    useApiWithAuthToken();

  return (
    <APIContext.Provider value={{ authToken, setAuthToken, httpStatus }}>
      <Provider
        url={process.env.REACT_APP_API_BASE}
        options={globalFetchOptions}
      >
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <RouterSetup />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </APIContext.Provider>
  );
}
