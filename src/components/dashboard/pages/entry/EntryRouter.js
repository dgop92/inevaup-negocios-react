import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import {
  useQueryOptions,
  CardListHeader,
  OrderingBar,
} from "../commons/headerInputs";
import DjangoPaginationTable from "../commons/tables/DjangoPaginationTable";
import GenericListView from "../commons/GenericListView";
import { getGenericPaths } from "../pathUtils";
import EntryView from "./EntryView"
import EntryCreate from "./EntryCreate"

const genericPaths = getGenericPaths("entries");

function fromUTCDateStringToDisplayDate(UTCdate){
  const localDate = new Date(UTCdate);
  return localDate.toLocaleString();
}

const colunmData = {
fieldKey: "pk",
columns: [
  {
    field: "provider",
    headerName: "Proveedor",
  },
  {
    field: "user",
    headerName: "Usuario",
  },
  {
    field: "created_date",
    headerName: "Fecha",
    displayFunction: fromUTCDateStringToDisplayDate,
  },
],
};

const orderItems = [
{
  label: "Fecha (Acendente)",
  value: "created_date",
},
{
  label: "Fecha (Decendente)",
  value: "-created_date",
},
];

export default function ItemRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <GenericListView pageHeaderTitle="Lista de entradas">
          <CardListContent />
        </GenericListView>
      </Route>
      <Route path={`${path}/create`} component={EntryCreate} />
      <Route path={`${path}/view/:id`} component={EntryView} />
    </Switch>
  );
}

function CardListContent() {
  const { queryOptions, handleInputChange } = useQueryOptions({
    ordering: "created_date",
  });

  return (
    <React.Fragment>
      <CardListHeader>
      <OrderingBar
          orderItems={orderItems}
          queryOptions={queryOptions}
          handleInputChange={handleInputChange}
          inputContainerStyles={{ maxWidth: 350 }}
        />
      </CardListHeader>
      <DjangoPaginationTable
        endPoint={genericPaths.itemPath}
        columnData={colunmData}
        tableStyles={{ minWidth: 850 }}
        queryOptions={queryOptions}
      />
    </React.Fragment>
  );
}
