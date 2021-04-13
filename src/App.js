import React from "react";
import RouterSetup from "./RouterSetup";
import { theme } from "./constants/materialUI";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "use-http";
import { APIContext, useApiWithAuthToken } from "./authentication/APIUtils";

export default function App() {
  const {
    authToken,
    setAuthToken,
    globalFetchOptions,
    httpStatus,
  } = useApiWithAuthToken();

  return (
    <APIContext.Provider value={{ authToken, setAuthToken, httpStatus }}>
      <Provider url="http://127.0.0.1:8000" options={globalFetchOptions}>
        <ThemeProvider theme={theme}>
          <RouterSetup />
        </ThemeProvider>
      </Provider>
    </APIContext.Provider>
  );
}
