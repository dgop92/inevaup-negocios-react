import React from "react";
import DjangoPaginationTable from "../commons/DjangoPaginationTable";
import SimplePageHeader from "../commons/SimplePageHeader";
import AddIcon from "@material-ui/icons/Add";
import {
  CardListHeader,
  OrderingBar,
} from "../commons/HeaderInputs";
import CardList, { useQueryOptions } from "../commons/CardList";

function fromUTCDateStringToDisplayDate(UTCdate){
    const localDate = new Date(UTCdate);
    return localDate.toLocaleString();
}

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

export default function EntryList() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Lista de entradas"
        buttonProps={{ title: "Añadir Entrada", startIcon: <AddIcon /> }}
      />
      <MainContent />
    </React.Fragment>
  );
}

function MainContent() {
  const { queryOptions, handleInputChange } = useQueryOptions({
    ordering: "created_date",
  });

  return (
    <CardList>
      <CardListHeader>
        <OrderingBar
          orderItems={orderItems}
          queryOptions={queryOptions}
          handleInputChange={handleInputChange}
          inputContainerStyles={{ maxWidth: 350 }}
        />
      </CardListHeader>
      <DjangoPaginationTable
        endPoint="dashboard/entries"
        columnData={colunmData}
        tableStyles={{ minWidth: 850 }}
        queryOptions={queryOptions}
      />
    </CardList>
  );
}
