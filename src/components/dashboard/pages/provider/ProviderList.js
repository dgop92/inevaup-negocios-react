import React from "react";
import DjangoPaginationTable from "../commons/DjangoPaginationTable";
import SimplePageHeader from "../commons/SimplePageHeader";
import AddIcon from "@material-ui/icons/Add";
import {
  CardListHeader,
  SearchBar,
  OrderingBar,
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

export default function ProviderList() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Lista de proveedores"
        buttonProps={{ title: "Añadir proveedor", startIcon: <AddIcon /> }}
      />
      <MainContent />
    </React.Fragment>
  );
}

function MainContent() {
  const { queryOptions, handleInputChange } = useQueryOptions({
    search: "",
    ordering: "name",
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
          inputContainerStyles={{ maxWidth: 300 }}
        />
      </CardListHeader>
      <DjangoPaginationTable
        endPoint="dashboard/providers"
        columnData={colunmData}
        tableStyles={{ minWidth: 550 }}
        queryOptions={queryOptions}
      />
    </CardList>
  );
}
