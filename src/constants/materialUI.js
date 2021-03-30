import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(88, 165, 240, 1)",
      main: "rgba(2, 119, 189, 1)",
      dark: "rgba(0, 76, 140, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "#2E2E2E",
      main: "#212121",
      dark: "#191919",
      contrastText: "#fff"
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
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  }
});
