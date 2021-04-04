import React from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SimplePageHeader from "../commons/SimplePageHeader";
import { useParams } from "react-router";
import Box from "@material-ui/core/Box";
import SimpleViewTable from "../commons/SimpleViewTable";
import useFetch from "use-http";
import SimpleViewCard from "../commons/SimpleViewCard";

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

export default function ProviderView() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Ver proveedor"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/providers",
        }}
      />
      <MainContent />
    </React.Fragment>
  );
}

function MainContent() {
  const { id } = useParams();

  const itemPath = "/dashboard/providers";
  const updatePath = `${itemPath}/update/${id}`;
  const { data: providerData = {} } = useFetch(`${itemPath}/${id}`, []);

  return (
    <Box mt={2} display="flex" justifyContent="center">
      <SimpleViewCard updatePath={updatePath}>
        <SimpleViewTable keysData={keysData} data={providerData} />
      </SimpleViewCard>
    </Box>
  );
}