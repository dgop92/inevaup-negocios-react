import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import GenericItemForm from "../commons/GenericItemForm";
import {
  useQueryOptions,
  CardListHeader,
  SearchBar,
  OrderingBar,
  FilterBar,
} from "../commons/headerInputs";
import DjangoPaginationTable from "../commons/DjangoPaginationTable";
import GenericListView from "../commons/GenericListView";
import GenericItemView from "../commons/GenericItemView";
import { getGenericPaths } from "../pathUtils";
import { ForeginSelect } from "../commons/formUtils";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { FooterViewButton } from "../commons/SimpleViewCard";

const genericPaths = getGenericPaths("products");

const colunmData = {
  fieldKey: "pk",
  columns: [
    {
      field: "name",
      headerName: "Nombre",
    },
    {
      field: "code",
      headerName: "Código",
    },
    {
      field: "sale_price",
      headerName: "Precio Venta",
      cellProps: {
        align: "right",
      },
    },
    {
      field: "purchase_price",
      headerName: "Precio Compra",
      cellProps: {
        align: "right",
      },
    },
    {
      field: "stock",
      headerName: "Stock",
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
  {
    label: "Stock (Acendente)",
    value: "stock",
  },
  {
    label: "Stock (Decendente)",
    value: "-stock",
  },
  {
    label: "Precio Venta (Acendente)",
    value: "sale_price",
  },
  {
    label: "Precio Venta (Decendente)",
    value: "-sale_price",
  },
  {
    label: "Precio Compra (Acendente)",
    value: "purchase_price",
  },
  {
    label: "Precio Compra (Decendente)",
    value: "-purchase_price",
  },
];

const brandFilterOptions = {
  endPoint: "dashboard/brands",
  filterName: "brand",
  label: "Marca",
  retrieveField: "name",
};

const catalogueFilterOptions = {
  endPoint: "dashboard/catalogues",
  filterName: "catalogue",
  label: "Catálogo",
  retrieveField: "name",
};

export default function ItemRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <GenericListView pageHeaderTitle="Lista de productos">
          <CardListContent />
        </GenericListView>
      </Route>
      <Route path={`${path}/create`}>
        <GenericItemForm
          pageHeaderTitle="Crear producto"
          backPath={genericPaths.itemPath}
          inputBody={InputBody}
          formTitles={{
            headerTitle: "Crear nuevo producto",
            buttonTitle: "Crear",
          }}
          useFormRequestArgs={{ itemPath: genericPaths.getPostEndPoint }}
        />
      </Route>
      <Route path={`${path}/view/:id`}>
        <GenericItemView
          pageHeaderTitle="Ver producto"
          endPointPaths={genericPaths}
          viewContainerProps={{
            customItemView: CustomItemView,
            protectedErrorMessage:
              "Esta marca está siendo usada en uno o varios productos",
          }}
        />
      </Route>
      <Route path={`${path}/update/:id`}>
        <GenericItemForm
          pageHeaderTitle="Actualizar producto"
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

function CardListContent() {
  const { queryOptions, handleInputChange } = useQueryOptions({
    search: "",
    ordering: "name",
    brand: "all",
    catalogue: "all",
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
          inputContainerStyles={{ maxWidth: 350 }}
        />
        <FilterBar
          filterOptions={brandFilterOptions}
          queryOptions={queryOptions}
          handleInputChange={handleInputChange}
          inputContainerStyles={{ maxWidth: 350 }}
        />
        <FilterBar
          filterOptions={catalogueFilterOptions}
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

function InputBody({ control, register, errors }) {
  return (
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
            defaultValue: "Sin marca",
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
            defaultValue: "Sin catálogo",
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
  );
}

function CustomItemView({ detailData: productData, footerProps }) {
  return (
    <Paper style={{ width: "100%", maxWidth: 950, padding: "1.5rem" }}>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6" style={{ marginBottom: 5 }}>
          {productData.name || "Nombre del Producto"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginBottom: "1rem" }}
        >
          {`Código: ${productData.code || "Código del Producto"}`}
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
              Clasificación
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Catálogo: ${productData.catalogue || "Catálogo"}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Marca: ${productData.brand || "Marca"}`}
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
              Precios
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Compra: ${productData.purchase_price || "Compra"}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Venta: ${productData.sale_price || "Venta"}`}
            </Typography>
          </Box>
        </Box>
        {/* Line 2 */}
        <Box p={1}>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body1"
              style={{ marginBottom: 5, fontWeight: 500 }}
            >
              Descripción
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {productData.details}
            </Typography>
          </Box>
        </Box>
        {/* Line 3 */}
        <Box p={1}>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body1"
              style={{ marginBottom: 5, fontWeight: 500 }}
            >
              Stock
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Cantidad Disponible: ${productData?.stock || "Sin Unidades"}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box display="flex" justifyContent="flex-end">
        <FooterViewButton
          {...footerProps}
        />
      </Box>
    </Paper>
  );
}
