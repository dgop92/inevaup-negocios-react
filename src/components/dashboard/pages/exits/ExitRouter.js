import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import {
  useQueryOptions,
  CardListHeader,
  OrderingBar,
  ItemSearchFilter,
} from "../commons/headerInputs";
import DjangoPaginationTable from "../commons/tables/DjangoPaginationTable";
import GenericListView from "../commons/GenericListView";
import { getEEPaths } from "../pathUtils";
import ExitForm from "./ExitForm";
import GenericEEView from "../commons/entrypurchases/GenericEEView";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GenericItemForm from "../commons/GenericItemForm";
import { ItemSearch } from "../commons/formUtils";

const eePaths = getEEPaths("exits", "sales", "exit");

function fromUTCDateStringToDisplayDate(UTCdate) {
  const localDate = new Date(UTCdate);
  return localDate.toLocaleString();
}

const colunmData = {
  fieldKey: "pk",
  columns: [
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
      field: "units_sold",
      headerName: "Und. Vendidas",
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
        <GenericListView pageHeaderTitle="Lista de salidas">
          <CardListContent />
        </GenericListView>
      </Route>
      <Route path={`${path}/create`}>
        <ExitForm endPointPaths={eePaths} inputBody={ExitInputBody} />
      </Route>
      <Route path={`${path}/view/:id`}>
        <GenericEEView
          customGeneralView={CustomGeneralView}
          pageHeaderTitle="Ver salida"
          endPointPaths={eePaths}
        />
      </Route>
      <Route path={`${path}/update/:id`}>
        <GenericItemForm
          pageHeaderTitle="Actualizar Salida"
          backPath={eePaths.itemPath}
          inputBody={ExitInputBody}
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

const itemListSearchOptions = {
  inputName: "client",
  endpoint: "/dashboard/clients",
  mainField: "tice",
  secondaryFields: [
    { displayName: "Nombre", fieldName: "name" },
    { displayName: "Telefono", fieldName: "phone" },
  ],
};

function CardListContent() {
  const { queryOptions, handleInputChange, setNewPair } = useQueryOptions({
    ordering: "created_date",
    client: "all",
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
        <ItemSearchFilter
          placeholder="Buscar Clientes"
          itemSearchOptions={itemListSearchOptions}
          setNewPair={setNewPair}
          inputContainerStyles={{ maxWidth: 450 }}
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

function CustomGeneralView({ data }) {
  return (
    <React.Fragment>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6" style={{ marginBottom: 5 }}>
          {`Salida Numero ${data?.pk}`}
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
              {`Cliente: ${data.client || "Sin cliente"}`}
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
              {`Unidades vendidas: ${data.units_sold || "Unidades"}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Total vendido: ${data.total_sold || "Total"}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

function ExitInputBody({ register, errors }) {
  return (
    <Box my={2}>
      <ItemSearch
        placeholder="Buscar cliente"
        register={register}
        errors={errors}
        itemSearchOptions={itemListSearchOptions}
        inputContainerStyles={{ maxWidth: null, width: null }}
        registerOptions={{
          maxLength: {
            value: 70,
            message: "Demasiados caracteres",
          },
        }}
      />
    </Box>
  );
}
