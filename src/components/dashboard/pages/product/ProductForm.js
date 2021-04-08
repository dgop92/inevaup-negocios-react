import React from "react";
import {
  ForeginSelect,
  FormContainer,
  FormFooter,
  FormHeader,
  NonFieldErrors,
} from "../commons/formUtils";
import { useFormRequest } from "../commons/formHooks";
import SimplePageHeader from "../commons/SimplePageHeader";
import ArrowBack from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Redirect, useParams } from "react-router";
import Grid from "@material-ui/core/Grid";

const itemPath = "/dashboard/products/";

export function ProductCreate() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Crear producto"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/products",
        }}
      />
      <Box mt={2}>
        <FormWrapperContainer
          headerTitle="Crear nuevo producto"
          buttonTitle="Crear"
        />
      </Box>
    </React.Fragment>
  );
}

export function ProductUpdate() {
  const { id } = useParams();

  return (
    <React.Fragment>
      <SimplePageHeader
        title="Actualizar producto"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: itemPath,
        }}
      />
      <Box mt={2}>
        <FormWrapperContainer
          headerTitle="Formulario de actualización"
          buttonTitle="Actualizar"
          updatePk={id}
        />
      </Box>
    </React.Fragment>
  );
}

function FormWrapperContainer({ headerTitle, buttonTitle, updatePk }) {
  const {
    control,
    register,
    onSubmit,
    errors,
    loading,
    nonFieldErros,
    successPath,
  } = useFormRequest(itemPath, updatePk);

  if (successPath) return <Redirect to={successPath} />;

  return (
    <form onSubmit={onSubmit}>
      <FormContainer paperStyles={{ maxWidth: undefined }}>
        <FormHeader title={headerTitle}></FormHeader>
        <Grid container spacing={2} style={{ padding: "1rem 0" }}>
          <Grid item md={6} xs={12}>
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
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              name="code"
              label="Código"
              size="small"
              fullWidth
              variant="outlined"
              inputRef={register({
                required: "Este campo es requerido",
                maxLength: {
                  value: 70,
                  message: "Demasiados caracteres",
                },
              })}
              error={errors.code ? true : false}
              helperText={errors?.code?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="details"
              label="Detalles"
              multiline
              rows={10}
              fullWidth
              variant="outlined"
              inputRef={register}
              error={errors.details ? true : false}
              helperText={errors?.details?.message}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              name="purchase_price"
              label="Precio compra"
              size="small"
              fullWidth
              variant="outlined"
              inputRef={register({
                required: "Este campo es requerido",
              })}
              error={errors.purchase_price ? true : false}
              helperText={errors?.purchase_price?.message}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              name="sale_price"
              label="Precio venta"
              size="small"
              fullWidth
              variant="outlined"
              inputRef={register({
                required: "Este campo es requerido",
              })}
              error={errors.sale_price ? true : false}
              helperText={errors?.sale_price?.message}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ForeginSelect
              selectOptions={{
                endPoint: "/dashboard/brands",
                fieldName: "brand",
                retrieveField: "name",
                label: "Marca",
                defaultValue: "Sin marca"
              }}
              control={control}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ForeginSelect
              selectOptions={{
                endPoint: "/dashboard/catalogues",
                fieldName: "catalogue",
                retrieveField: "name",
                label: "Catálogo",
                defaultValue: "Sin catálogo"
              }}
              control={control}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              name="stock"
              label="Stock"
              size="small"
              fullWidth
              variant="outlined"
              defaultValue={"0"}
              inputRef={register({
                required: "Este campo es requerido",
              })}
              error={errors.stock ? true : false}
              helperText={errors?.stock?.message}
            />
          </Grid>
        </Grid>
        <NonFieldErrors errors={nonFieldErros}></NonFieldErrors>
        <FormFooter title={buttonTitle} loading={loading} />
      </FormContainer>
    </form>
  );
}
