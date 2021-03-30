import React from "react";
import RouterSetup from "./RouterSetup";
import { theme } from "./constants/materialUI";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "use-http";
import { AuthContext, useAuthToken } from "./authentication/authUtils";

export default function App() {
  const { authToken, setAuthToken, globalFetchOptions } = useAuthToken();

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <Provider url="http://127.0.0.1:8000" options={globalFetchOptions}>
        <ThemeProvider theme={theme}>
          <RouterSetup />
        </ThemeProvider>
      </Provider>
    </AuthContext.Provider>
  );
}
