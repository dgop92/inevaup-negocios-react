import React, { useState } from "react";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DjangoPaginationTable from "../commons/DjangoPaginationTable";
import MenuItem from "@material-ui/core/MenuItem";
import SimplePageHeader from "../commons/SimplePageHeader";
import AddIcon from "@material-ui/icons/Add";

const useCardListHeaderStyles = makeStyles((theme) => ({
  cardListHeader: {
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

const useCardListStyles = makeStyles((theme) => ({
  cardList: {
    width: "100%",
    borderRadius: theme.typography.fontSize,
    marginTop: theme.spacing(2),
  },
}));

const colunmData = {
  fieldKey: "pk",
  columns: [
    {
      field: "name",
      headerName: "Nombre",
    },
  ],
};

export default function BrandList() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Lista de marcas"
        buttonProps={{ title: "Añadir marca", startIcon: <AddIcon /> }}
      />
      <CardList />
    </React.Fragment>
  );
}

function CardList() {
  const classes = useCardListStyles();

  const [queryOptions, setQueryOptions] = useState({
    search: "",
    ordering: "name",
  });

  return (
    <Paper className={classes.cardList}>
      <CardListHeader
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

function CardListHeader({ queryOptions, setQueryOptions }) {
  const classes = useCardListHeaderStyles();

  const handleQueryOptionsChange = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    const newPair = {};
    newPair[inputKey] = inputValue;
    setQueryOptions({ ...queryOptions, ...newPair });
  };

  return (
    <div className={classes.cardListHeader}>
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
