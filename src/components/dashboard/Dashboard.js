import React, { useState } from "react";
import Header from "./Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BrandRouter from "./pages/brand/BrandRouter";
import CatalogueRouter from "./pages/catalogue/CatalogueRouter";
import ProductRouter from "./pages/product/ProductRouter";
import ProviderRouter from "./pages/provider/ProviderRouter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: 256,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  main: {
    flex: 1,
    background: theme.palette.background.dashboardMain,
    padding: theme.spacing(2),
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
        <Hidden mdUp implementation="js">
          <Navigator
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        {/* Fixed */}
        <Hidden smDown implementation="css">
          <Navigator />
        </Hidden>
      </nav>
      <div className={classes.app}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <main className={classes.main}>
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}

function DashboardContent() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} children={<div> Dashboard Home </div>} />
      <Route path={`${path}/brands`} children={<BrandRouter />} />
      <Route path={`${path}/catalogues`} children={<CatalogueRouter />} />
      <Route path={`${path}/products`} children={<ProductRouter />} />
      <Route path={`${path}/providers`} children={<ProviderRouter />} />
      <Route path="*" children={<Redirect to={path} />} />
    </Switch>
  );
}
