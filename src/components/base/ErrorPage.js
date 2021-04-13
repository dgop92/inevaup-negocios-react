import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  backToHomeButton: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1, 2),
    marginTop: theme.spacing(4),
  },
}));

export default function ErrorPage({ title, subTitle }) {
  const classes = useStyles();
  const history = useHistory();

  const goBackToHome = () => {
    history.replace("/");
    history.go(0);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        p={3}
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          {subTitle}
        </Typography>

        <Button
          className={classes.backToHomeButton}
          color="primary"
          variant="contained"
          onClick={goBackToHome}
        >
          Regresar al home
        </Button>
      </Box>
    </React.Fragment>
  );
}

ErrorPage.defaultProps = {
  title: "404",
  subTitle: "Página no econtrada",
};
