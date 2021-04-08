import React from "react";
import SimpleForm from "../commons/formUtils";
import { useFormRequest } from "../commons/formHooks";
import SimplePageHeader from "../commons/SimplePageHeader";
import ArrowBack from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Redirect, useParams } from "react-router";

const itemPath = "/dashboard/providers/";

export function ProviderCreate() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Crear proveedor"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/providers",
        }}
      />
      <Box mt={2}>
        <FormContainer
          headerTitle="Crear nuevo proveedor"
          buttonTitle="Crear"
        />
      </Box>
    </React.Fragment>
  );
}

export function ProviderUpdate() {
  const { id } = useParams();

  return (
    <React.Fragment>
      <SimplePageHeader
        title="Actualizar proveedor"
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
  } = useFormRequest(itemPath, updatePk);

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
          name="email"
          label="Correo"
          size="small"
          fullWidth
          variant="outlined"
          inputRef={register({
            maxLength: {
              value: 70,
              message: "Demasiados caracteres",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Correo inválido",
            },
          })}
          error={errors.email ? true : false}
          helperText={errors?.email?.message}
        />
      </Box>
    </SimpleForm>
  );
}
