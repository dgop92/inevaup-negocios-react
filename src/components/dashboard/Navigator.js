import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import { useRouteMatch, NavLink } from "react-router-dom";
import {
  BrandIcon,
  CatalogueIcon,
  ProviderIcon,
  ProductIcon,
  EntryIcon,
  ExitIcon,
} from "./customIcons/CustomIcons";

const categories = [
  {
    id: "Administración",
    children: [
      { id: "Home", icon: <HomeIcon />, pathName: "" },
      { id: "Marcas", icon: <BrandIcon />, pathName: "/brands"},
      { id: "Catálogos", icon: <CatalogueIcon />, pathName: "/catalogues" },
      { id: "Productos", icon: <ProductIcon />, pathName: "/products"},
      { id: "Provedores", icon: <ProviderIcon />, pathName: "/providers"},
      { id: "Clientes", icon: <GroupIcon />, pathName: "/clients" },
    ],
  },
  {
    id: "Negocio",
    children: [
      { id: "Entradas", icon: <EntryIcon />, pathName: "/entries" },
      { id: "Salidas", icon: <ExitIcon />, pathName: "/exits"},
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  itemCategory: {
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  drawerTitle: {
    fontSize: 20,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: theme.palette.primary.light,
  },
  itemPrimary: {
    fontSize: "inherit",
    fontWeight: theme.typography.fontWeightMedium,
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
    color: "inherit",
    "& svg": {
      fontSize: 20,
    },
  },
  divider: {
    marginTop: theme.spacing(2),
    backgroundColor: "#404854",
  },
}));

function Navigator(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { path: currPath } = useRouteMatch();

  return (
    <Drawer
      PaperProps={{
        style: {
          width: 256,
          backgroundColor: theme.palette.secondary.main,
        },
      }}
      variant="permanent"
      {...props}
    >
      <List disablePadding>
        <ListItem
          className={clsx(
            classes.drawerTitle,
            classes.item,
            classes.itemCategory
          )}
        >
          Inevaup Negocios
        </ListItem>
      </List>

      {categories.map(({ id, children }) => (
        <React.Fragment key={id}>
          <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              {id}
            </ListItemText>
          </ListItem>
          {children.map(({ id: childId, icon, pathName }) => (
            <ListItemLink
              key={childId}
              to={`${currPath}${pathName}`}
              text={childId}
              icon={icon}
              classes={classes}
            ></ListItemLink>
          ))}

          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </Drawer>
  );
}

function ListItemLink(props) {
  const { to, icon, text, classes } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <NavLink
          to={to}
          activeClassName={classes.itemActiveItem}
          exact
          ref={ref}
          {...itemProps}
        />
      )),
    [to, classes.itemActiveItem]
  );

  return (
    <ListItem className={classes.item} button component={renderLink}>
      <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
      <ListItemText
        classes={{
          primary: classes.itemPrimary,
        }}
      >
        {text}
      </ListItemText>
    </ListItem>
  );
}

export default Navigator;
