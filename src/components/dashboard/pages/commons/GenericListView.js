import React from "react";
import SimplePageHeader from "./SimplePageHeader";
import AddIcon from "@material-ui/icons/Add";
import CardList from "./CardList";

export default function GenericListView({pageHeaderTitle, children}) {
  return (
    <React.Fragment>
      <SimplePageHeader
        title={pageHeaderTitle}
        buttonProps={{ title: "Crear", startIcon: <AddIcon /> }}
      />
      <CardList>
        {children}
      </CardList>
    </React.Fragment>
  );
}
