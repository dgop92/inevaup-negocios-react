import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import GenericItemForm from "../commons/GenericItemForm";
import {
  useQueryOptions,
  CardListHeader,
  SearchBar,
  OrderingBar,
} from "../commons/headerInputs";
import DjangoPaginationTable from "../commons/tables/DjangoPaginationTable";
import GenericListView from "../commons/GenericListView";
import GenericItemView from "../commons/GenericItemView";
import { getGenericPaths } from "../pathUtils";

const genericPaths = getGenericPaths("clients");

const colunmData = {
  fieldKey: "pk",
  columns: [
    {
      field: "name",
      headerName: "Nombre",
    },
    {
      field: "phone",
      headerName: "Teléfono",
    },
    {
      field: "tice",
      headerName: "Identificación",
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
  {
    field: "phone",
    name: "Teléfono",
  },
  {
    field: "tice",
    name: "Identificación",
  },
];

export default function ItemRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <GenericListView GenericListView pageHeaderTitle="Lista de clientes">
          <CardListContent />
        </GenericListView>
      </Route>
      <Route path={`${path}/create`}>
        <GenericItemForm
          pageHeaderTitle="Crear cliente"
          backPath={genericPaths.itemPath}
          inputBody={InputBody}
          formTitles={{
            headerTitle: "Crear nuevo cliente",
            buttonTitle: "Crear",
          }}
          useFormRequestArgs={{ itemPath: genericPaths.getPostEndPoint }}
        />
      </Route>
      <Route path={`${path}/view/:id`}>
        <GenericItemView
          pageHeaderTitle="Ver cliente"
          endPointPaths={genericPaths}
          viewContainerProps={{
            keysData: keysData
          }}
        />
      </Route>
      <Route path={`${path}/update/:id`}>
        <GenericItemForm
          pageHeaderTitle="Actualizar cliente"
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
    <Box display="grid" gridGap="1rem" my={2}>
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
      <TextField
        name="phone"
        label="Teléfono"
        size="small"
        fullWidth
        variant="outlined"
        inputRef={register({
          maxLength: {
            value: 15,
            message: "Demasiados caracteres",
          },
        })}
        error={errors.phone ? true : false}
        helperText={errors?.phone?.message}
      />
      <TextField
        name="tice"
        label="Identificación"
        size="small"
        fullWidth
        variant="outlined"
        inputRef={register({
          maxLength: {
            value: 15,
            message: "Demasiados caracteres",
          },
        })}
        error={errors.tice ? true : false}
        helperText={errors?.tice?.message}
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
        tableStyles={{ minWidth: 550 }}
        queryOptions={queryOptions}
      />
    </React.Fragment>
  );
}
