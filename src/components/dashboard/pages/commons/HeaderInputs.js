import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import useFetch from "use-http";
import { BaseModal } from "./modals";
import { makeStyles } from "@material-ui/core/styles";

const useCardListStyles = makeStyles((theme) => ({
  cardList: {
    width: "100%",
    borderRadius: theme.typography.fontSize,
    marginTop: theme.spacing(2),
  },
}));

export function CardList(props) {
  const classes = useCardListStyles();

  return <Paper className={classes.cardList}>{props.children}</Paper>;
}

export function CardListHeader(props) {
  return (
    <Box
      p={3}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      {...props}
    >
      {props.children}
    </Box>
  );
}

export function useQueryOptions(defaultQueryOptions) {
  const [queryOptions, setQueryOptions] = useState(defaultQueryOptions);

  const handleInputChange = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    const newPair = {};
    newPair[inputKey] = inputValue;
    setQueryOptions({ ...queryOptions, ...newPair });
  };

  return { queryOptions, setQueryOptions, handleInputChange };
}

export function SearchBar({ handleInputChange, inputContainerStyles }) {
  return (
    <HeaderInputContainer inputContainerStyles={inputContainerStyles}>
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
        onChange={handleInputChange}
      />
    </HeaderInputContainer>
  );
}

export function OrderingBar({
  orderItems,
  queryOptions,
  handleInputChange,
  inputContainerStyles,
}) {
  return (
    <HeaderInputContainer inputContainerStyles={inputContainerStyles}>
      <TextField
        name="ordering"
        label="Ordenar"
        variant="outlined"
        fullWidth
        size="small"
        select
        value={queryOptions.ordering}
        onChange={handleInputChange}
      >
        {orderItems.map((orderItem) => (
          <MenuItem key={`${orderItem.value}`} value={`${orderItem.value}`}>
            {orderItem.label}
          </MenuItem>
        ))}
      </TextField>
    </HeaderInputContainer>
  );
}

export function FilterBar({
  filterOptions,
  queryOptions,
  handleInputChange,
  inputContainerStyles,
}) {
  const { data: getData = { results: [] } } = useFetch(
    filterOptions.endPoint,
    []
  );

  return (
    <HeaderInputContainer inputContainerStyles={inputContainerStyles}>
      <TextField
        name={filterOptions.filterName}
        label={filterOptions.label}
        variant="outlined"
        fullWidth
        size="small"
        select
        value={queryOptions[filterOptions.filterName]}
        onChange={handleInputChange}
      >
        <MenuItem value={"all"}>Todos</MenuItem>
        {getData.results.map((item) => (
          <MenuItem
            key={item[filterOptions.retrieveField]}
            value={item[filterOptions.retrieveField]}
          >
            {item[filterOptions.retrieveField]}
          </MenuItem>
        ))}
      </TextField>
    </HeaderInputContainer>
  );
}

function SearchItemModal({
  modalState,
  setModalState,
  placeholder,
  itemSearchOptions,
}) {
  const { queryOptions, handleInputChange } = useQueryOptions({
    search: "",
    limit: "5",
  });

  const itemEndPoint = fromObjectToQuery(
    itemSearchOptions.endpoint,
    queryOptions
  );

  const { data: getData = { results: [] } } = useFetch(itemEndPoint, [
    queryOptions,
  ]);

  const onItemSelected = (itemValue) => {
    setModalState({ open: false, itemValue: itemValue });
  };

  return (
    <BaseModal
      open={modalState.open}
      setModal={() => setModalState({ ...modalState, open: false })}
      title={placeholder}
    >
      <Box display="flex" flexDirection="column" p={2}>
        <SearchBar
          handleInputChange={handleInputChange}
          inputContainerStyles={{ maxWidth: 350 }}
        />
        {getData.results.map((item, index) => (
          <List key={index} component="div">
            <ListItem
              button
              onClick={() => onItemSelected(item[itemSearchOptions.mainField])}
            >
              <ListItemText
                primary={item[itemSearchOptions.mainField]}
                secondary={item[itemSearchOptions.secondaryField]}
              />
            </ListItem>
          </List>
        ))}
      </Box>
    </BaseModal>
  );
}

export function ItemSearch({
  placeholder,
  itemSearchOptions,
  inputContainerStyles,
  register,
  errors,
}) {
  const boxProps = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const [modalState, setModalState] = useState({ open: false, itemValue: "" });

  return (
    <React.Fragment>
      {modalState.open && (
        <SearchItemModal
          modalState={modalState}
          setModalState={setModalState}
          placeholder={placeholder}
          itemSearchOptions={itemSearchOptions}
        />
      )}
      <HeaderInputContainer
        boxProps={boxProps}
        inputContainerStyles={inputContainerStyles}
      >
        <ActionIconButton
          toolTipTitle="Buscar"
          onClick={() =>
            setModalState({ ...modalState, open: true })
          }
        >
          <SearchIcon />
        </ActionIconButton>
        <TextField
          name={itemSearchOptions.inputName}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{readOnly: true}}
          inputRef={register({
            required: "Este campo es requerido",
            maxLength: {
              value: 70,
              message: "Demasiados caracteres",
            },
          })}
          value={modalState.itemValue}
          error={errors[itemSearchOptions.inputName] ? true : false}
          helperText={errors[itemSearchOptions.inputName]?.message}
        />
      </HeaderInputContainer>
    </React.Fragment>
  );
}

function ActionIconButton(props) {
  return (
    <Tooltip title={props.toolTipTitle}>
      <IconButton onClick={props.onClick} color="secondary">
        {props.children}
      </IconButton>
    </Tooltip>
  );
}

function HeaderInputContainer(props) {
  const inputContainerStyles = {
    maxWidth: 300,
    width: "100%",
    ...props.inputContainerStyles,
  };
  return (
    <Box m={1} {...props.boxProps} style={inputContainerStyles}>
      {props.children}
    </Box>
  );
}

function fromObjectToQuery(enpoint, queryOptions) {
  const myUrl = new URL("http://127.0.0.1:8000");
  for (const property in queryOptions) {
    if (queryOptions[property] && queryOptions[property] !== "all") {
      myUrl.searchParams.append(property, queryOptions[property]);
    }
  }
  return `${enpoint}/${myUrl.search}`;
}
