import React from "react";
import RouterSetup from "./RouterSetup"
import { theme } from "./constants/materialUI"
import { ThemeProvider } from '@material-ui/core/styles';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterSetup/>
    </ThemeProvider>
  )
}
