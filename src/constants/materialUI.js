import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(79, 91, 98, 1)",
      main: "rgba(13, 27, 42, 1)",
      dark: "rgba(0, 10, 18, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(119, 141, 169, 1)",
      main: "rgba(65, 90, 119, 1)",
      dark: "rgba(27, 38, 59, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});
