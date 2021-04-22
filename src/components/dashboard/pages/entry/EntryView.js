import React, { useEffect, useState } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SimplePageHeader from "../commons/SimplePageHeader";
import { useParams } from "react-router";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import useFetch from "use-http";
import Typography from "@material-ui/core/Typography";
import { FooterViewButton } from "../commons/SimpleViewCard";
import DeleteModal from "../commons/DeleteModal";

import DjangoPaginationTable from "../commons/DjangoPaginationTable";
import {
  CardListHeader,
  OrderingBar,
  SearchBar,
} from "../commons/HeaderInputs";
import CardList, { useQueryOptions } from "../commons/CardList";
import UpdateModal from "../commons/UpdateModal";
import { FormFooter } from "../commons/formUtils";
import { useFormRequest } from "../commons/formHooks";
import TextField from "@material-ui/core/TextField";

function fromUTCDateStringToDisplayDate(UTCdate) {
  const localDate = new Date(UTCdate);
  return localDate.toLocaleString();
}

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

// use cache? you could create a function to compute this in the server
function getComputedData(entry_purchases) {
  let totalUnits = 0,
    totalSpent = 0;
  if (!entry_purchases) return { totalUnits, totalSpent };

  entry_purchases.forEach((purchase) => {
    totalUnits += purchase.amount;
    totalSpent += purchase.amount * purchase.product_purchase_price;
  });

  return { totalUnits, totalSpent };
}

export default function EntryView() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Ver Entrada"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/entries",
        }}
      />
      <MainContent />
    </React.Fragment>
  );
}

function MainContent() {
  const { id } = useParams();

  const itemPath = "/dashboard/entries";
  const updatePath = `${itemPath}/update/${id}`;
  const { data: entryData = {} } = useFetch(`${itemPath}/${id}`, []);

  const [modal, setModal] = useState(false);

  const { totalUnits, totalSpent } = getComputedData(
    entryData?.entry_purchases
  );

  return (
    <React.Fragment>
      {modal && (
        <DeleteModal
          open={modal}
          setModal={setModal}
          itemPath={itemPath}
          pkPath={`/${id}`}
          protectedErrorMessage="Elimina todas las compras hechas con esta entrada primero"
        ></DeleteModal>
      )}
      <Box mt={2} display="flex" justifyContent="center">
        <Paper style={{ width: "100%", padding: "1.5rem" }}>
          {/* Header */}
          <Box mb={2}>
            <Typography variant="h6" style={{ marginBottom: 5 }}>
              {`Entrada Numero ${entryData?.pk}`}
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
                  General
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Proveedor: ${entryData.provider || "Proveedor"}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Usuario Encargado: ${entryData.user || "Usuario"}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Fecha: ${
                    fromUTCDateStringToDisplayDate(entryData.created_date) ||
                    "Fecha"
                  }`}
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
                  Informacion sobre compras
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Unidades compradas: ${totalUnits || "Unidades"}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Total gastado: ${totalSpent || "Total"}`}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Footer */}
          <Box display="flex" justifyContent="flex-end">
            <FooterViewButton
              onDelete={() => setModal(true)}
              updatePath={updatePath}
            />
          </Box>
        </Paper>
      </Box>
      <PurchaseCardList />
    </React.Fragment>
  );
}

function PurchaseCardList() {
  const { id } = useParams();

  const { queryOptions, handleInputChange } = useQueryOptions({
    search: "",
    ordering: "amount",
    entry: id,
  });

  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updatePk, setUpdatePk] = useState(0);

  const { register, onSubmit, errors, loading, successPath } = useFormRequest(
    "/dashboard/purchases/",
    updatePk,
    true
  );

  useEffect(() => {
    if (successPath) {
      console.log("YES SNAKBAR");
      setUpdateModal(false);
    }
  }, [setUpdateModal, successPath]);

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
          itemPath="/dashboard/purchases"
          pkPath={`/${updatePk}`}
          noredirect={true}
        ></DeleteModal>
      )}
      {updateModal && (
        <UpdateModal
          open={updateModal}
          setModal={setUpdateModal}
          modalTitle="Actualizar compra"
        >
          <form onSubmit={onSubmit}>
            <TextField
              name="amount"
              autoFocus
              label="Cantidad"
              size="small"
              fullWidth
              variant="outlined"
              type="number"
              inputRef={register({
                required: "Este campo es requerido",
                maxLength: {
                  value: 70,
                  message: "Demasiados caracteres",
                },
              })}
              error={errors.amount ? true : false}
              helperText={errors?.amount?.message}
            />
            <FormFooter
              boxProps={{ mt: 2 }}
              title="Actualizar"
              loading={loading}
            />
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
          endPoint="dashboard/purchases"
          columnData={colunmData}
          tableStyles={{ minWidth: 850 }}
          queryOptions={queryOptions}
          rowActions={rowActions}
        />
      </CardList>
    </React.Fragment>
  );
}
