import React, { useCallback, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chart from "react-apexcharts";
import useFetch from "use-http";
import { formatCurrency, ValueTypography } from "../utils";

function getDefaultDays() {
  const days = [];
  for (let i = 1; i < 32; i++) {
    days.push(i);
  }
}

function getDefaultSales() {
  return new Array(31).fill(0);
}

const defaultPaperStyle = {
  width: "100%",
  padding: "1.5rem",
};

const DAILY_SALES_HEIGHT = 600;

export default function DashboardHome() {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{ padding: "1rem 0" }}
    >
      <Grid item xs={12}>
        <SaleChart />
      </Grid>
      <Grid item md={4} xs={12}>
        <MonthlyStatus />
      </Grid>
      <Grid item md={8} xs={12}>
        <BestProductChart></BestProductChart>
      </Grid>
      <Grid item md={9} xs={12}>
        <FewProductChart />
      </Grid>
    </Grid>
  );
}

function MonthlyStatus() {
  const date = new Date();
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const { data = {} } = useFetch(
    `dashboard/queries/monthly_status/${currentMonth}`,
    []
  );

  return (
    <Paper
      style={{
        ...defaultPaperStyle,
        height: 400,
      }}
    >
      <Typography variant="h6" style={{ marginBottom: "1rem" }}>
        Estado del mes
      </Typography>
      <Box display="grid" gridGap="0.5rem">
        <Box
          px={1}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Typography variant="body2" color="textPrimary">
            Venta total:
          </Typography>
          <ValueTypography
            value={data?.monthly_sold}
            getValueOptions={{
              formatFunction: (value) => formatCurrency(value, "es-CO", "COP"),
            }}
            typographyProps={{
              color: "textPrimary",
            }}
          />
        </Box>
        <Box
          px={1}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Typography variant="body2" color="textPrimary">
            Gasto total:
          </Typography>
          <ValueTypography
            value={data?.monthly_spent}
            getValueOptions={{
              formatFunction: (value) => formatCurrency(value, "es-CO", "COP"),
            }}
            typographyProps={{
              color: "textPrimary",
            }}
          />
        </Box>
        <Box
          px={1}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Typography variant="body2" color="textPrimary">
            Ganancias:
          </Typography>
          <ValueTypography
            value={data?.monthly_profit}
            getValueOptions={{
              formatFunction: (value) => formatCurrency(value, "es-CO", "COP"),
            }}
            typographyProps={{
              color: "textPrimary",
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}

function SaleChart() {
  const { get, response } = useFetch();

  const [dailySales, setDailySales] = useState({
    series: [
      {
        name: "Ventas",
        data: getDefaultSales(),
      },
    ],
    options: {
      chart: {
        height: DAILY_SALES_HEIGHT,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: getDefaultDays(),
      },
      yaxis: {
        labels: {
          formatter: function (val, index) {
            return formatCurrency(val, "es-CO", "COP");
          },
        },
      },
    },
  });

  const loadSales = useCallback(async () => {
    const date = new Date();
    const currentMonth = String(date.getMonth() + 1).padStart(2, "0");

    const seriesData = await get(
      `dashboard/queries/daily_sales_by_month/${currentMonth}`
    );
    if (response.ok) {
      setDailySales((dailySales) => ({
        series: [
          {
            name: "Ventas",
            data: seriesData.daily_sales,
          },
        ],
        options: {
          ...dailySales.options,
          xaxis: {
            categories: seriesData.month_days,
          },
        },
      }));
    }
  }, [setDailySales, get, response]);

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  return (
    <Paper
      style={{
        ...defaultPaperStyle,
        height: 500,
      }}
    >
      <Typography variant="h6" style={{ marginBottom: 5 }}>
        Ventas Diarias
      </Typography>
      <Box m={1} height="90%">
        <Chart
          options={dailySales.options}
          series={dailySales.series}
          type="line"
          height="100%"
        />
      </Box>
    </Paper>
  );
}

function BestProductChart() {
  const { get, response } = useFetch();

  const [bestProducts, setBestProducts] = useState({
    series: [
      {
        data: [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        y: {
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            return formatCurrency(value, "es-CO", "COP");
          },
        },
      },
      xaxis: {
        categories: [
          "Product 1",
          "Product 2",
          "Product 3",
          "Product 4",
          "Product 5",
        ],
        labels: {
          formatter: function (val, index) {
            return formatCurrency(val, "es-CO", "COP");
          },
        },
      },
    },
  });

  const loadBestProducts = useCallback(async () => {
    const seriesData = await get("dashboard/queries/best_products");
    if (response.ok) {
      setBestProducts((bestProducts) => ({
        series: [
          {
            name: "Ventas",
            data: seriesData.best_product_by_sales.prices,
          },
        ],
        options: {
          ...bestProducts.options,
          xaxis: {
            categories: seriesData.best_product_by_sales.products,
          },
        },
      }));
    }
  }, [setBestProducts, get, response]);

  useEffect(() => {
    loadBestProducts();
  }, [loadBestProducts]);

  return (
    <Paper
      style={{
        ...defaultPaperStyle,
        height: 400,
      }}
    >
      <Typography variant="h6" style={{ marginBottom: 5 }}>
        Mejores productos por ventas
      </Typography>
      <Box m={1} height="90%">
        <Chart
          options={bestProducts.options}
          series={bestProducts.series}
          type="bar"
          height="100%"
        />
      </Box>
    </Paper>
  );
}

function FewProductChart() {
  const { get, response } = useFetch();

  const [fewProducts, setFewProducts] = useState({
    series: [
      {
        data: [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Product 1",
          "Product 2",
          "Product 3",
          "Product 4",
          "Product 5",
        ],
      },
    },
  });

  const loadFewProducts = useCallback(async () => {
    const seriesData = await get("dashboard/queries/product_with_few_stocks");
    if (response.ok) {
      setFewProducts((fewProducts) => ({
        series: [
          {
            name: "Stock",
            data: seriesData.stocks,
          },
        ],
        options: {
          ...fewProducts.options,
          xaxis: {
            categories: seriesData.products,
          },
        },
      }));
    }
  }, [setFewProducts, get, response]);

  useEffect(() => {
    loadFewProducts();
  }, [loadFewProducts]);

  return (
    <Paper
      style={{
        ...defaultPaperStyle,
        height: 400,
      }}
    >
      <Typography variant="h6" style={{ marginBottom: 5 }}>
        Productos con poco stock
      </Typography>
      <Box m={1} height="90%">
        <Chart
          options={fewProducts.options}
          series={fewProducts.series}
          type="bar"
          height="100%"
        />
      </Box>
    </Paper>
  );
}
