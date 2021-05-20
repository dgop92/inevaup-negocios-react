import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import {
  useQueryOptions,
  CardListHeader,
  OrderingBar,
} from "../commons/headerInputs";
import DjangoPaginationTable from "../commons/tables/DjangoPaginationTable";
import GenericListView from "../commons/GenericListView";
import { getEEPaths } from "../pathUtils";
import EntryForm from "./EntryForm"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GenericItemForm from "../commons/GenericItemForm";
import GenericEEView from "../commons/entrypurchases/GenericEEView";
import { ItemSearch } from "../commons/formUtils";

const eePaths = getEEPaths("entries", "purchases", "entry");

function fromUTCDateStringToDisplayDate(UTCdate) {
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
    {
      field: "units_bought",
      headerName: "Und. Compradas",
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
      <Route path={`${path}/create`}>
        <EntryForm endPointPaths={eePaths} inputBody={EntryInputBody} />
      </Route>
      <Route path={`${path}/view/:id`}>
        <GenericEEView
          customGeneralView={CustomGeneralView}
          pageHeaderTitle="Ver entrada"
          endPointPaths={eePaths}
        />
      </Route>
      <Route path={`${path}/update/:id`}>
        <GenericItemForm
          pageHeaderTitle="Actualizar Entrada"
          backPath={eePaths.itemPath}
          inputBody={EntryInputBody}
          formTitles={{
            headerTitle: "Actualizar información general",
            buttonTitle: "Actualizar",
          }}
          useFormRequestArgs={{
            itemPath: eePaths.parentPaths.getPostEndPoint,
            updateMode: true,
          }}
        />
      </Route>
    </Switch>
  );
}

function CardListContent() {
  const { queryOptions, handleInputChange } = useQueryOptions({
    ordering: "-created_date",
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
        endPoint={eePaths.itemPath}
        columnData={colunmData}
        tableStyles={{ minWidth: 850 }}
        queryOptions={queryOptions}
      />
    </React.Fragment>
  );
}

const itemSearchOptions = {
  inputName: "provider",
  endpoint: "/dashboard/providers",
  mainField: "name",
};

function EntryInputBody({ register, errors }) {
  return (
    <Box my={2}>
      <ItemSearch
        placeholder="Buscar proveedor"
        register={register}
        errors={errors}
        itemSearchOptions={itemSearchOptions}
        inputContainerStyles={{ maxWidth: null, width: null }}
      />
    </Box>
  );
}

function CustomGeneralView({ data }) {
  return (
    <React.Fragment>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6" style={{ marginBottom: 5 }}>
          {`Entrada Numero ${data?.pk}`}
        </Typography>
        <Divider />
      </Box>
      {/* Content */}
      <Box pb={2} display="flex" flexDirection="column">
        {/* Line 1 */}
        <Box display="flex" flexWrap="wrap">
          <Box
            display="flex"
            flexDirection="column"
            flexGrow="1"
            flexBasis="auto"
            p={1}
          >
            <Typography
              variant="body1"
              style={{ marginBottom: 5, fontWeight: 500 }}
            >
              General
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Proveedor: ${data.provider || "Proveedor"}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Usuario Encargado: ${data.user || "Usuario"}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Fecha: ${
                fromUTCDateStringToDisplayDate(data.created_date) || "Fecha"
              }`}
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            flexGrow="1"
            flexBasis="auto"
            p={1}
          >
            <Typography
              variant="body1"
              style={{ marginBottom: 5, fontWeight: 500 }}
            >
              Informacion sobre compras
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Unidades compradas: ${data.units_bought || "Unidades"}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Total gastado: ${data.total_spent || "Total"}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
