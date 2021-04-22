import React from "react";
import SimpleForm from "../commons/formUtils";
import { useFormRequest } from "../commons/formHooks";
import SimplePageHeader from "../commons/SimplePageHeader";
import ArrowBack from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Redirect, useParams } from "react-router";

const itemPath = "/dashboard/catalogues/";

export function CatalogueCreate() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Crear catálogo"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/catalogues",
        }}
      />
      <Box mt={2}>
        <FormContainer
          headerTitle="Crear nuevo catálogo"
          buttonTitle="Crear"
        />
      </Box>
    </React.Fragment>
  );
}

export function CatalogueUpdate() {
  const { id } = useParams();

  return (
    <React.Fragment>
      <SimplePageHeader
        title="Actualizar catálogo"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: itemPath,
        }}
      />
      <Box mt={2}>
        <FormContainer
          headerTitle="Formulario de actualización"
          buttonTitle="Actualizar"
          updatePk={id}
        />
      </Box>
    </React.Fragment>
  );
}

function FormContainer({ headerTitle, buttonTitle, updatePk }) {
  const {
    register,
    onSubmit,
    errors,
    loading,
    nonFieldErros,
    successPath,
  } = useFormRequest({itemPath: itemPath, updatePk: updatePk});

  if (successPath) return <Redirect to={successPath} />;

  return (
    <SimpleForm
      headerTitle={headerTitle}
      buttonTitle={buttonTitle}
      handleSubmit={onSubmit}
      loading={loading}
      nonFieldErros={nonFieldErros}
    >
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
    </SimpleForm>
  );
}
