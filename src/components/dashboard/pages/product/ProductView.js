import React, { useState } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SimplePageHeader from "../commons/SimplePageHeader";
import { useParams } from "react-router";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import useFetch from "use-http";
import { Typography } from "@material-ui/core";
import { FooterViewButton } from "../commons/SimpleViewCard";
import DeleteModal from "../commons/DeleteModal";

export default function ProductView() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Ver producto"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/products",
        }}
      />
      <MainContent />
    </React.Fragment>
  );
}

function MainContent() {
  const { id } = useParams();

  const itemPath = "/dashboard/products";
  const updatePath = `${itemPath}/update/${id}`;
  const { data: productData = {} } = useFetch(`${itemPath}/${id}`, []);

  const [modal, setModal] = useState(false);

  return (
    <React.Fragment>
      <DeleteModal
        open={modal}
        setModal={setModal}
        itemPath={itemPath}
        pkPath={`/${id}`}
        protectedErrorMessage="Este producto está siendo en otros registros"
      ></DeleteModal>
      <Box mt={2} display="flex" justifyContent="center">
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
                  {`Cantidad Disponible: ${
                    productData?.stock || "Sin Unidades"
                  }`}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Header */}
          <Box display="flex" justifyContent="flex-end">
            <FooterViewButton
              onDelete={() => setModal(true)}
              updatePath={updatePath}
            />
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
}
