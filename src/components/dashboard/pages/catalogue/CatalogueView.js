import React, { useState } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SimplePageHeader from "../commons/SimplePageHeader";
import { Redirect, useParams } from "react-router";
import Box from "@material-ui/core/Box";
import SimpleViewTable from "../commons/SimpleViewTable";
import useFetch from "use-http";
import SimpleViewCard from "../commons/SimpleViewCard";
import DeleteModal from "../commons/DeleteModal";

const keysData = [
  {
    field: "name",
    name: "Nombre",
  },
];

export default function CatalogueView() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Ver catálogo"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/catalogues",
        }}
      />
      <MainContent />
    </React.Fragment>
  );
}

function MainContent() {
  const { id } = useParams();

  const itemPath = "/dashboard/catalogues";
  const updatePath = `${itemPath}/update/${id}`;
  const { data: catalogueData = {} } = useFetch(`${itemPath}/${id}`, []);

  const [modal, setModal] = useState(false);

  const onSuccessDelete = () => <Redirect to={itemPath} />;

  return (
    <React.Fragment>
      <DeleteModal
        open={modal}
        setModal={setModal}
        deletePath={`${itemPath}/${id}`}
        protectedErrorMessage="Este catálogo está siendo usado en uno o varios productos"
        onSuccessDelete={onSuccessDelete}
      ></DeleteModal>
      <Box mt={2} display="flex" justifyContent="center">
        <SimpleViewCard onDelete={() => setModal(true)} updatePath={updatePath}>
          <SimpleViewTable keysData={keysData} data={catalogueData} />
        </SimpleViewCard>
      </Box>
    </React.Fragment>
  );
}
