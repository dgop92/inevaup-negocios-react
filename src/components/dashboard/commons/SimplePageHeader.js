import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  viewTitle: {
    fontWeight: 500,
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  headerButton: {
    margin: theme.spacing(1),
    marginLeft: 0,
    borderRadius: theme.typography.fontSize,
    textTransform: "none",
  },
}));

export default function SimplePageHeader({ title, buttonProps }) {
  const classes = useStyles();

  buttonProps.to = buttonProps.to || `${window.location.pathname}/create`;

  return (
    <Toolbar disableGutters>
      <Grid container alignItems="center">
        <Grid item sm xs={12}>
          <Typography
            className={classes.viewTitle}
            color="inherit"
            variant="h5"
            component="h5"
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.headerButton}
            variant="contained"
            component={RouterLink}
            to={buttonProps.to}
            color="primary"
            startIcon={buttonProps.startIcon}
          >
            {buttonProps.title}
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
