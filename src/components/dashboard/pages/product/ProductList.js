import React from "react";
import DjangoPaginationTable from "../commons/DjangoPaginationTable";
import SimplePageHeader from "../commons/SimplePageHeader";
import AddIcon from "@material-ui/icons/Add";
import {
  CardListHeader,
  SearchBar,
  OrderingBar,
  FilterBar,
} from "../commons/HeaderInputs";
import CardList, { useQueryOptions } from "../commons/CardList";

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

export default function ProductList() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Lista de productos"
        buttonProps={{ title: "Añadir producto", startIcon: <AddIcon /> }}
      />
      <MainContent />
    </React.Fragment>
  );
}

function MainContent() {
  const { queryOptions, handleInputChange } = useQueryOptions({
    search: "",
    ordering: "name",
    brand: "all",
    catalogue: "all",
  });

  return (
    <CardList>
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
        endPoint="dashboard/products"
        columnData={colunmData}
        tableStyles={{ minWidth: 850 }}
        queryOptions={queryOptions}
      />
    </CardList>
  );
}
