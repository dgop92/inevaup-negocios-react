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

import {
  BrandIcon,
  CatalogueIcon,
  ProviderIcon,
  EntryIcon,
  ExitIcon,
} from "./customIcons/CustomIcons";

const categories = [
  {
    id: "Administración",
    children: [
      { id: "Home", icon: <HomeIcon />, active: true },
      { id: "Marcas", icon: <BrandIcon /> },
      { id: "Catálogos", icon: <CatalogueIcon /> },
      { id: "Provedores", icon: <ProviderIcon /> },
      { id: "Usuarios", icon: <GroupIcon /> },
    ],
  },
  {
    id: "Negocio",
    children: [
      { id: "Entradas", icon: <EntryIcon /> },
      { id: "Salidas", icon: <ExitIcon /> },
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
  firebase: {
    fontSize: 20,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
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
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
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
          {children.map(({ id: childId, icon, active }) => (
            <ListItem
              key={childId}
              button
              className={clsx(classes.item, active && classes.itemActiveItem)}
            >
              <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                {childId}
              </ListItemText>
            </ListItem>
          ))}

          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </Drawer>
  );
}

export default Navigator;
