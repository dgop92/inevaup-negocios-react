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
import { Controller } from "react-hook-form";

const genericPaths = getGenericPaths("providers");

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
      field: "email",
      headerName: "Correo",
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
    field: "email",
    name: "Correo",
  },
];

export default function ItemRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <GenericListView GenericListView pageHeaderTitle="Lista de proveedores">
          <CardListContent />
        </GenericListView>
      </Route>
      <Route path={`${path}/create`}>
        <GenericItemForm
          pageHeaderTitle="Crear proveedor"
          backPath={genericPaths.itemPath}
          inputBody={InputBody}
          formTitles={{
            headerTitle: "Crear nuevo proveedor",
            buttonTitle: "Crear",
          }}
          useFormRequestArgs={{ itemPath: genericPaths.getPostEndPoint }}
        />
      </Route>
      <Route path={`${path}/view/:id`}>
        <GenericItemView
          pageHeaderTitle="Ver proveedor"
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
          pageHeaderTitle="Actualizar proveedor"
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

function InputBody({ control, errors }) {
  return (
    <Box display="grid" gridGap="1rem" my={2}>
      <Controller
        as={TextField}
        control={control}
        name="name"
        label="Nombre"
        size="small"
        fullWidth
        variant="outlined"
        autoFocus
        rules={{
          required: "Este campo es requerido",
          maxLength: {
            value: 70,
            message: "Demasiados caracteres",
          },
        }}
        error={errors.name ? true : false}
        helperText={errors?.name?.message}
        defaultValue=""
      />
      <Controller
        as={TextField}
        control={control}
        name="phone"
        label="Teléfono"
        size="small"
        fullWidth
        variant="outlined"
        rules={{
          maxLength: {
            value: 15,
            message: "Demasiados caracteres",
          },
        }}
        error={errors.phone ? true : false}
        helperText={errors?.phone?.message}
        defaultValue=""
      />
      <Controller
        as={TextField}
        control={control}
        name="email"
        label="Correo"
        size="small"
        fullWidth
        variant="outlined"
        rules={{
          maxLength: {
            value: 70,
            message: "Demasiados caracteres",
          },
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Correo inválido",
          },
        }}
        error={errors.email ? true : false}
        helperText={errors?.email?.message}
        defaultValue=""
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
