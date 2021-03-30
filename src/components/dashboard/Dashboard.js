import React, { useState } from "react";
import Header from "./Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: 256,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        {/* Mobile responsive */}
        <Hidden smUp implementation="js">
          <Navigator
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        {/* Fixed */}
        <Hidden xsDown implementation="css">
          <Navigator/>
        </Hidden>
      </nav>
      <div className={classes.app}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <main className={classes.main}>
          <RouterContent />
        </main>
      </div>
    </div>
  );
}

function RouterContent() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <div> Dashboard Home </div>
      </Route>
      <Route path={`${path}/brands`}>
        <div> Dashboard brands </div>
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
