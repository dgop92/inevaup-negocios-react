import React, { useState } from "react";
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
import DjangoPaginationTable from "../commons/DjangoPaginationTable";
import MenuItem from "@material-ui/core/MenuItem";

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
    maxWidth: 300,
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

const colunmData = {
  fieldKey: "pk",
  columns: [
    {
      field: "name",
      headerName: "Nombre",
    },
  ],
};

function PaperView({ paperViewClass }) {
  const [queryOptions, setQueryOptions] = useState({
    search: "",
    ordering: "name",
  });

  return (
    <Paper className={paperViewClass}>
      <PaperHeader
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
      />
      <DjangoPaginationTable
        endPoint="dashboard/brands"
        columnData={colunmData}
        tableStyles={{ minWidth: 350 }}
        queryOptions={queryOptions}
      />
    </Paper>
  );
}

function PaperHeader({ queryOptions, setQueryOptions }) {
  const classes = useStyles();

  const handleQueryOptionsChange = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    const newPair = {};
    newPair[inputKey] = inputValue;
    setQueryOptions({ ...queryOptions, ...newPair });
  };

  return (
    <div className={classes.paperHeader}>
      <div className={clsx(classes.searchContainer, classes.headerItem)}>
        <TextField
          name="search"
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
          onChange={handleQueryOptionsChange}
        />
      </div>
      <div className={clsx(classes.selectContainer, classes.headerItem)}>
        <TextField
          name="ordering"
          label="Ordenar"
          variant="outlined"
          fullWidth
          size="small"
          select
          value={queryOptions.ordering}
          onChange={handleQueryOptionsChange}
        >
          <MenuItem value={"name"}>Nombre (Acendente)</MenuItem>
          <MenuItem value={"-name"}>Nombre (Decendente)</MenuItem>
        </TextField>
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
