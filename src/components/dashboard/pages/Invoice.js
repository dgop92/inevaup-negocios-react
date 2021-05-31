import React, { useRef } from "react";
import { useParams } from "react-router";
import SimplePageHeader from "./commons/SimplePageHeader";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useFetch from "use-http";
import {
  getValueFromRawValue,
  formatCurrency,
  ValueTypography,
  fromUTCDateStringToDisplayDate,
} from "../../utils";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { useReactToPrint } from "react-to-print";
import Button from "@material-ui/core/Button";

const pageStyle = `
  @page {
    size: 80mm 297mm;
  }
`;

const columns = [
  {
    field: "product",
    headerName: "Codigo",
  },
  {
    field: "amount",
    headerName: "Cantidad",
  },
  {
    field: "unit_price",
    headerName: "Precio Uni.",
    displayFunction: (value) => formatCurrency(value, "es-CO", "COP"),
  },
];

const INVOICE_WIDTH = 305;
const INVOICE_HEIGHT = 1120;

const TITLE_FONT_SIZE = 16;
const SUBTITLE_FONT_SIZE = 12;
const PRODUCT_FONT_SIZE = 10;

export default function Invoice() {
  const { id } = useParams();

  return (
    <React.Fragment>
      <SimplePageHeader
        title="Facturas"
        buttonProps={{
          title: "Regresar",
          to: `/dashboard/exits/view/${id}`,
          startIcon: <ArrowBack />,
        }}
      />
      <InvoiceContent></InvoiceContent>
    </React.Fragment>
  );
}

function InvoiceContent() {
  const { id } = useParams();

  const componentToPrintRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
    pageStyle: pageStyle,
  });
  const { data = {} } = useFetch(`/dashboard/exits/${id}`, []);

  return (
    <Box m={2} display="flex" flexDirection="column" alignItems="center">
      <Box
        width={INVOICE_WIDTH}
        height={INVOICE_HEIGHT}
        display="flex"
        px={2.5}
        py={2}
        style={{ backgroundColor: "#FFFFFF" }}
        flexDirection="column"
        ref={componentToPrintRef}
      >
        <Typography
          align="center"
          variant="h6"
          style={{ fontSize: TITLE_FONT_SIZE }}
        >
          MEGASTORE
        </Typography>
        <Typography
          align="center"
          variant="body2"
          style={{ marginBottom: "1rem", fontSize: SUBTITLE_FONT_SIZE }}
        >
          NIT: 32104054-1 <br></br>
          REGIMEN SIMPLIFICADO <br></br>
          METROCENTRO LOCAL 124 <br></br>
          Teléfono: 3856176-3003647096 <br></br>
          FACTURA DE VENTA NO: {getValueFromRawValue(data?.pk)} <br></br>
        </Typography>
        <ProductList rows={data?.exit_sales} columns={columns} />
        <p style={{ margin: 0, textAlign: "center" }}>
          ---------------------------------------------------------------
        </p>
        <Box my={1}>
          <ValueTypography
            getValueOptions={{
              formatFunction: (value) => formatCurrency(value, "es-CO", "COP"),
            }}
            typographyProps={{
              style: { fontSize: PRODUCT_FONT_SIZE },
              color: "textPrimary",
            }}
            preFixedString="Total venta: "
            value={data?.total_sold}
          />
          <ValueTypography
            typographyProps={{
              style: { fontSize: PRODUCT_FONT_SIZE },
              color: "textPrimary",
            }}
            preFixedString="Unidades vendidas: "
            value={data?.units_sold}
          />
        </Box>
        <p style={{ margin: 0, textAlign: "center" }}>
          ---------------------------------------------------------------
        </p>
        <Box my={1}>
          <ValueTypography
            typographyProps={{
              style: { fontSize: PRODUCT_FONT_SIZE },
              color: "textPrimary",
            }}
            getValueOptions={{ nullMessage: "CLIENTE MEGASTORE" }}
            preFixedString="Cliente: "
            value={data?.client}
          />
          <ValueTypography
            typographyProps={{
              style: { fontSize: PRODUCT_FONT_SIZE },
              color: "textPrimary",
            }}
            getValueOptions={{ nullMessage: "Sin usuario" }}
            preFixedString="Usuario encargado: "
            value={data?.user}
          />
          <ValueTypography
            typographyProps={{
              style: { fontSize: PRODUCT_FONT_SIZE },
              color: "textPrimary",
            }}
            getValueOptions={{
              formatFunction: (value) => fromUTCDateStringToDisplayDate(value),
            }}
            preFixedString="Fecha-Hora: "
            value={data?.created_date}
          />
        </Box>
        <p style={{ margin: 0, textAlign: "center" }}>
          ---------------------------------------------------------------
        </p>
        <Box my={1}>
          <Typography
            align="center"
            variant="body1"
            color="textPrimary"
            style={{ marginBottom: "1rem", fontSize: SUBTITLE_FONT_SIZE }}
          >
            -- CONDICIONES DE VENTA Y GARANTIA --
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color="textPrimary"
            style={{ marginBottom: "1rem", fontSize: PRODUCT_FONT_SIZE }}
          >
            *** Por recomendación del gobierno, todo equipo movil debe ser
            registrado ante su operador, NO se dará garantía de ningún equipo
            por desactivación del mismo si no ha sido registrado.
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color="textPrimary"
            style={{ marginBottom: "1rem", fontSize: PRODUCT_FONT_SIZE }}
          >
            *** La garantía NO cubre Tactil o Display por golpe, por mal uso,
            por humedad o alto voltaje. NO ACCESORIOS
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color="textPrimary"
            style={{ marginBottom: "1rem", fontSize: PRODUCT_FONT_SIZE }}
          >
            *** MEGASTORE no se hace responsable de equipos que hayan sido
            manipulados por terceros no autorizados o que presenten los sellos
            de humedad y/o seguridad alterados o con señales de abuso.
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color="textPrimary"
            style={{ marginBottom: "1rem", fontSize: PRODUCT_FONT_SIZE }}
          >
            *** Es indispensable presentar la FACTURA para hacer efectiva la
            garantía y que esté dentro del tiempo de garantía otorgado.
          </Typography>
        </Box>
      </Box>
      <Button
        onClick={handlePrint}
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem", width: INVOICE_WIDTH }}
      >
        Imprimir
      </Button>
    </Box>
  );
}

function ProductList({ rows, columns }) {
  columns.forEach((col) => {
    if (!col.displayFunction) {
      col.displayFunction = (value) => value;
    }
  });
  return (
    <Box display="flex" flexDirection="column" mb={2}>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        flexDirection="row"
        gridGap="8px"
        mb={1}
      >
        {columns.map((colunm, index) => (
          <Box key={index}>
            <Typography
              style={{ fontWeight: 500, fontSize: PRODUCT_FONT_SIZE }}
              variant="body2"
            >
              {colunm.headerName}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="column">
        {rows?.map((row, index) => (
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            flexDirection="row"
            gridGap="8px"
            key={index}
          >
            {columns.map((colunm, index) => (
              <Box key={index} overflow="hidden">
                <Typography
                  style={{ fontSize: PRODUCT_FONT_SIZE }}
                  variant="body2"
                >
                  {colunm.displayFunction(row[colunm.field])}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
