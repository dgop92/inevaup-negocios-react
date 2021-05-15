import React, { useState } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SimplePageHeader from "../SimplePageHeader";
import { Redirect, useParams } from "react-router";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import useFetch from "use-http";
import { FooterViewButton } from "../SimpleViewCard";
import DeleteModal from "../DeleteModal";
import DjangoPaginationTable from "../tables/DjangoPaginationTable";
import {
  useQueryOptions,
  CardList,
  CardListHeader,
  OrderingBar,
  SearchBar,
} from "../headerInputs";
import UpdateModal from "../UpdateModal";
import { FormFooter } from "../formUtils";
import { useFormRequest } from "../formUtils";
import PSInputBody from "./PSInputBody";

const colunmData = {
  fieldKey: "pk",
  columns: [
    {
      field: "product",
      headerName: "Producto",
    },
    {
      field: "amount",
      headerName: "Cantidad",
    },
    {
      field: "unit_price",
      headerName: "Precio Unitario",
    },
  ],
};

const orderItems = [
  {
    label: "Cantidad (Acendente)",
    value: "amount",
  },
  {
    label: "Cantidad (Decendente)",
    value: "-amount",
  },
];

export default function GenericEEView({
  pageHeaderTitle,
  endPointPaths,
  customGeneralView: CustomGeneralView,
}) {
  return (
    <React.Fragment>
      <SimplePageHeader
        title={pageHeaderTitle}
        buttonProps={{
          title: "Regresar",
          to: endPointPaths.itemPath,
          startIcon: <ArrowBack />,
        }}
      />
      <ViewContainer
        endPointPaths={endPointPaths}
        customGeneralView={CustomGeneralView}
      />
    </React.Fragment>
  );
}

function ViewContainer({
  endPointPaths,
  customGeneralView: CustomGeneralView,
}) {
  const { id } = useParams();

  const detailPath = endPointPaths.parentPaths.getDetailEndPoint(id);
  const { data = {} } = useFetch(detailPath, []);

  const [modal, setModal] = useState(false);

  const onSuccessDelete = () => <Redirect to={endPointPaths.itemPath} />;

  return (
    <React.Fragment>
      {modal && (
        <DeleteModal
          open={modal}
          setModal={setModal}
          deletePath={detailPath}
          protectedErrorMessage="Elimina todas las compras realizadas con este item"
          onSuccessDelete={onSuccessDelete}
        ></DeleteModal>
      )}
      <Box mt={2} display="flex" justifyContent="center">
        <Paper style={{ width: "100%", padding: "1.5rem" }}>
          <CustomGeneralView data={data} />

          <Box display="flex" justifyContent="flex-end">
            <FooterViewButton
              onDelete={() => setModal(true)}
              updatePath={detailPath}
            />
          </Box>
        </Paper>
      </Box>
      <EECardList endPointPaths={endPointPaths} />
    </React.Fragment>
  );
}

function EECardList({ endPointPaths }) {
  const { id } = useParams();

  const { queryOptions, handleInputChange } = useQueryOptions({
    search: "",
    ordering: "amount",
    [endPointPaths.parentName]: id,
  });

  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updatePk, setUpdatePk] = useState(0);

  const onSuccess = () => console.log("YES SNAKBAR");
  const postPath = endPointPaths.childPaths.getPostEndPoint;
  const itemPath = endPointPaths.childPaths.itemPath;

  const { register, onSubmit, errors, loading } = useFormRequest({
    itemPath: postPath,
    updatePk: updatePk,
    updateWithPatch: true,
    onSuccess: onSuccess,
  });

  const rowActions = {
    onUpdate: (pk) => {
      setUpdatePk(pk);
      setUpdateModal(true);
    },
    onDelete: (pk) => {
      setDeleteModal(true);
      setUpdatePk(pk);
    },
  };

  return (
    <React.Fragment>
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          setModal={setDeleteModal}
          deletePath={endPointPaths.childPaths.getDetailEndPoint(updatePk)}
          noredirect={true}
          onSuccessDelete={() => console.log("SNACK BAR")}
        ></DeleteModal>
      )}
      {updateModal && (
        <UpdateModal
          open={updateModal}
          setModal={setUpdateModal}
          modalTitle="Actualizar compra"
        >
          <form onSubmit={onSubmit}>
            <PSInputBody register={register} errors={errors}></PSInputBody>
            <FormFooter mt={2} title="Actualizar" loading={loading} />
          </form>
        </UpdateModal>
      )}
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
        </CardListHeader>
        <DjangoPaginationTable
          endPoint={itemPath}
          columnData={colunmData}
          tableStyles={{ minWidth: 850 }}
          queryOptions={queryOptions}
          rowActions={rowActions}
        />
      </CardList>
    </React.Fragment>
  );
}
