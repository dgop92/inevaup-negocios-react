import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ItemTable from "../commons/ItemTable";

const useStyles = makeStyles((theme) => ({
  viewTitle: {
    fontWeight: 500,
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  addButton: {
    margin: theme.spacing(1),
    marginLeft: 0,
    borderRadius: theme.typography.fontSize,
    textTransform: "none",
  },
  viewPaper: {
    width: "100%",
    borderRadius: theme.typography.fontSize,
    marginTop: theme.spacing(2),
  },
  paperHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  headerItem: {
    margin: theme.spacing(1),
  },
  searchContainer: {
    width: "100%",
    maxWidth: 350,
  },
  selectContainer: {
    width: "100%",
    maxWidth: 200,
  },
}));

export default function BrandView() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar disableGutters>
        <Grid container alignItems="center">
          <Grid item sm xs={12}>
            <Typography
              className={classes.viewTitle}
              color="inherit"
              variant="h5"
              component="h5"
            >
              Lista de Marcas
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.addButton}
              variant="contained"
              component={RouterLink}
              to="/dashboard/brands/create"
              color="primary"
              startIcon={<AddIcon />}
            >
              Añadir Marca
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
      <PaperView paperViewClass={classes.viewPaper} />
    </React.Fragment>
  );
}

const columns = [
  {
    name: "Nombre",
    dataName: "name",
  },
];

const rows = [
  {
    pk: 1,
    name: "Nike",
  },
  {
    pk: 2,
    name: "Huwawei",
  },
  {
    pk: 5,
    name: "Appel",
  },
  {
    pk: 6,
    name: "iris",
  },
  {
    pk: 7,
    name: "Magia",
  },
  {
    pk: 71,
    name: "Papel",
  },
  {
    pk: 9,
    name: "Carro",
  },
];

function PaperView({ paperViewClass }) {
  return (
    <Paper className={paperViewClass}>
      <PaperHeader />
      <ItemTable columns={columns} rows={rows} colunmKey={"pk"} />
    </Paper>
  );
}

function PaperHeader() {
  const classes = useStyles();

  return (
    <div className={classes.paperHeader}>
      <div className={clsx(classes.searchContainer, classes.headerItem)}>
        <TextField
          // className={classes.margin}
          placeholder="Buscar"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}

/* 
<FormControl
          variant="outlined"
          className={classes.formControl}
          fullWidth
        >
          <InputLabel id="order-select">Age</InputLabel>
          <Select
            labelId="order-select"
            id="order-select"
            label="Ordenar"
          >
            <MenuItem value={"name"}>Nombre</MenuItem>
            <MenuItem value={"stock"}>Stock</MenuItem>
          </Select>
        </FormControl>

*/

/* 

<div className={clsx(classes.selectContainer, classes.headerItem)}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          select
          value={"name"}
        >
          <MenuItem value={"name"}>Nombre</MenuItem>
        </TextField>
      </div>

*/
