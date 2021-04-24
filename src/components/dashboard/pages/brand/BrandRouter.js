import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import GenericItemForm from "../commons/GenericItemForm";
import { useQueryOptions } from "../commons/CardList";
import {
  CardListHeader,
  SearchBar,
  OrderingBar,
} from "../commons/HeaderInputs";
import DjangoPaginationTable from "../commons/DjangoPaginationTable";
import GenericListView from "../commons/GenericListView";
import GenericItemView from "../commons/GenericItemView";
import { getGenericPaths } from "../pathUtils";

const genericPaths = getGenericPaths("brands");

const colunmData = {
  fieldKey: "pk",
  columns: [
    {
      field: "name",
      headerName: "Nombre",
    },
  ],
};

const orderItems = [
  {
    label: "Nombre (Acendente)",
    value: "name",
  },
  {
    label: "Nombre (Decendente)",
    value: "-name",
  },
];

const keysData = [
  {
    field: "name",
    name: "Nombre",
  },
];

export default function ItemRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <GenericListView pageHeaderTitle="Lista de marcas">
          <CardListContent />
        </GenericListView>
      </Route>
      <Route path={`${path}/create`}>
        <GenericItemForm
          pageHeaderTitle="Crear marca"
          backPath={genericPaths.itemPath}
          inputBody={InputBody}
          formTitles={{
            headerTitle: "Crear nueva marca",
            buttonTitle: "Crear",
          }}
          useFormRequestArgs={{ itemPath: genericPaths.getPostEndPoint }}
        />
      </Route>
      <Route path={`${path}/view/:id`}>
        <GenericItemView
          pageHeaderTitle="Ver marca"
          endPointPaths={genericPaths}
          viewContainerProps={{
            keysData: keysData,
            protectedErrorMessage:
              "Esta marca está siendo usada en uno o varios productos",
          }}
        />
      </Route>
      <Route path={`${path}/update/:id`}>
        <GenericItemForm
          pageHeaderTitle="Actualizar marca"
          backPath={genericPaths.itemPath}
          inputBody={InputBody}
          formTitles={{
            headerTitle: "Formulario de actualización",
            buttonTitle: "Actualizar",
          }}
          useFormRequestArgs={{
            itemPath: genericPaths.getPostEndPoint,
            updateMode: true,
          }}
        />
      </Route>
    </Switch>
  );
}

function InputBody({ register, errors }) {
  return (
    <Box my={2}>
      <TextField
        name="name"
        label="Nombre"
        size="small"
        fullWidth
        variant="outlined"
        autoFocus
        inputRef={register({
          required: "Este campo es requerido",
          maxLength: {
            value: 70,
            message: "Demasiados caracteres",
          },
        })}
        error={errors.name ? true : false}
        helperText={errors?.name?.message}
      />
    </Box>
  );
}

function CardListContent() {
  const { queryOptions, handleInputChange } = useQueryOptions({
    search: "",
    ordering: "name",
  });

  return (
    <React.Fragment>
      <CardListHeader>
        <SearchBar
          handleInputChange={handleInputChange}
          inputContainerStyles={{ maxWidth: 350 }}
        />
        <OrderingBar
          orderItems={orderItems}
          queryOptions={queryOptions}
          handleInputChange={handleInputChange}
          inputContainerStyles={{ maxWidth: 300 }}
        />
      </CardListHeader>
      <DjangoPaginationTable
        endPoint={genericPaths.itemPath}
        columnData={colunmData}
        tableStyles={{ minWidth: 350 }}
        queryOptions={queryOptions}
      />
    </React.Fragment>
  );
}
