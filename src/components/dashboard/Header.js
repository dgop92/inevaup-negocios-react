import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  secondaryBar: {
    zIndex: 0,
    paddingBottom: theme.spacing(1),
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  headerAvatar: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 26,
    letterSpacing: 0.5,
  },
  helpIcon: {
    padding: theme.spacing(1),
  },
}));

const mainEndPointsNames = {
  brands: "Marcas",
  catalogues: "Catálogos",
  products: "Productos",
  providers: "Provedores",
  clients: "Clientes",
  entries: "Entradas",
  exits: "Salidas",
};

export default function Header({ onDrawerToggle }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />

            
          </Grid>
        </Toolbar>
      </AppBar>

      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography
                className={classes.headerTitle}
                color="inherit"
                variant="h5"
                component="h1"
              >
                {getHeaderName()}
              </Typography>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
function getHeaderName() {
  const path = window.location.href;
  for (const key in mainEndPointsNames) {
    if (Object.hasOwnProperty.call(mainEndPointsNames, key)) {
      if (path.includes(key)) {
        return mainEndPointsNames[key];
      }
    }
  }
  return "Home";
}
