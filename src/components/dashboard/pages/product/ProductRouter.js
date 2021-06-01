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
  ItemSearchFilter,
} from "../commons/headerInputs";
import DjangoPaginationTable from "../commons/tables/DjangoPaginationTable";
import GenericListView from "../commons/GenericListView";
import GenericItemView from "../commons/GenericItemView";
import { getGenericPaths } from "../pathUtils";
import { ItemSearch } from "../commons/formUtils";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { FooterViewButton } from "../commons/SimpleViewCard";
import { formatCurrency, ValueTypography } from "../../../utils";
import { Controller } from "react-hook-form";

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
      displayFunction: (value) => formatCurrency(value, "es-CO", "COP"),
      cellProps: {
        align: "right",
      },
    },
    {
      field: "purchase_price",
      headerName: "Precio Compra",
      displayFunction: (value) => formatCurrency(value, "es-CO", "COP"),
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

const brandSearchOptions = {
  inputName: "brand",
  endpoint: "dashboard/brands",
  mainField: "name",
};

const catalogueSearchOptions = {
  inputName: "catalogue",
  endpoint: "dashboard/catalogues",
  mainField: "name",
};

function CardListContent() {
  const { queryOptions, handleInputChange, setNewPair } = useQueryOptions({
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
        <ItemSearchFilter
          placeholder="Filtrar por marca"
          itemSearchOptions={brandSearchOptions}
          setNewPair={setNewPair}
          inputContainerStyles={{ maxWidth: 350 }}
        />
        <ItemSearchFilter
          placeholder="Filtrar por catálogo"
          itemSearchOptions={catalogueSearchOptions}
          setNewPair={setNewPair}
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
      </Grid>
      <Grid item md={6} xs={12}>
        <Controller
          as={TextField}
          control={control}
          name="code"
          label="Código"
          size="small"
          fullWidth
          variant="outlined"
          inputRef={{
            required: "Este campo es requerido",
            maxLength: {
              value: 70,
              message: "Demasiados caracteres",
            },
          }}
          error={errors.code ? true : false}
          helperText={errors?.code?.message}
          defaultValue=""
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          as={TextField}
          control={control}
          name="details"
          label="Detalles"
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          error={errors.details ? true : false}
          helperText={errors?.details?.message}
          defaultValue=""
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Controller
          as={TextField}
          control={control}
          name="purchase_price"
          label="Precio compra"
          size="small"
          fullWidth
          variant="outlined"
          rules={{
            required: "Este campo es requerido",
          }}
          error={errors.purchase_price ? true : false}
          helperText={errors?.purchase_price?.message}
          defaultValue=""
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Controller
          as={TextField}
          control={control}
          name="sale_price"
          label="Precio venta"
          size="small"
          fullWidth
          variant="outlined"
          rules={{
            required: "Este campo es requerido",
          }}
          error={errors.sale_price ? true : false}
          helperText={errors?.sale_price?.message}
          defaultValue=""
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ItemSearch
          placeholder="Buscar marca"
          register={register}
          errors={errors}
          itemSearchOptions={brandSearchOptions}
          inputContainerStyles={{ maxWidth: null, width: null }}
          extraBoxProps={{ m: 0 }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ItemSearch
          placeholder="Buscar catálogo"
          register={register}
          errors={errors}
          itemSearchOptions={catalogueSearchOptions}
          inputContainerStyles={{ maxWidth: null, width: null }}
          extraBoxProps={{ m: 0 }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Controller
          as={TextField}
          control={control}
          name="stock"
          label="Stock"
          size="small"
          fullWidth
          variant="outlined"
          rules={{
            required: "Este campo es requerido",
          }}
          error={errors.stock ? true : false}
          helperText={errors?.stock?.message}
          defaultValue=""
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
        <ValueTypography
          value={productData?.name}
          typographyProps={{
            variant: "h6",
            color: "textPrimary",
            style: { marginBottom: 5 },
          }}
        />
        <ValueTypography
          preFixedString="Código: "
          value={productData?.code}
          typographyProps={{
            color: "textSecondary",
            style: { marginBottom: "1rem" },
          }}
        />
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
            <ValueTypography
              preFixedString="Catálogo: "
              value={productData?.catalogue}
            />
            <ValueTypography
              preFixedString="Marca: "
              value={productData?.brand}
            />
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
            <ValueTypography
              preFixedString="Compra: "
              value={productData?.purchase_price}
              getValueOptions={{
                formatFunction: (value) =>
                  formatCurrency(value, "es-CO", "COP"),
              }}
            />
            <ValueTypography
              preFixedString="Venta: "
              value={productData?.sale_price}
              getValueOptions={{
                formatFunction: (value) =>
                  formatCurrency(value, "es-CO", "COP"),
              }}
            />
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
            <ValueTypography value={productData?.details} />
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
            <ValueTypography
              preFixedString="Cantidad Disponible: "
              value={productData?.stock}
            />
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box display="flex" justifyContent="flex-end">
        <FooterViewButton {...footerProps} />
      </Box>
    </Paper>
  );
}
