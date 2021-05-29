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
import EntryForm from "./EntryForm";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GenericItemForm from "../commons/GenericItemForm";
import GenericEEView from "../commons/entrypurchases/GenericEEView";
import { ItemSearch } from "../commons/formUtils";
import {
  formatCurrency,
  fromUTCDateStringToDisplayDate,
  ValueTypography,
} from "../../../utils";

const eePaths = getEEPaths("entries", "purchases", "entry");

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
        <ValueTypography
          preFixedString="Entrada número "
          value={data?.pk}
          typographyProps={{
            variant: "h6",
            color: "textPrimary",
            style: { marginBottom: 5 },
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
              General
            </Typography>
            <ValueTypography
              getValueOptions={{ nullMessage: "Sin proveedor" }}
              preFixedString="Proveedor: "
              value={data?.provider}
            />
            <ValueTypography
              getValueOptions={{ nullMessage: "Sin usuario" }}
              preFixedString="Usuario encargado: "
              value={data?.user}
            />
            <ValueTypography
              getValueOptions={{
                formatFunction: (value) =>
                  fromUTCDateStringToDisplayDate(value),
              }}
              preFixedString="Fecha de creación: "
              value={data?.created_date}
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
              Informacion sobre compras
            </Typography>
            <ValueTypography
              preFixedString="Unidades compradas: "
              value={data.units_bought}
            />
            <ValueTypography
              getValueOptions={{
                formatFunction: (value) =>
                  formatCurrency(value, "es-CO", "COP"),
              }}
              preFixedString="Total gastado: "
              value={data.total_spent}
            />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
