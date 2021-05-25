import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import useFetch from "use-http";
import { SearchItemModal } from "./modals";
import { makeStyles } from "@material-ui/core/styles";
import { ActionIconButton } from "./tables/tableUtils";

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

  const setNewPair = (key, value) => {
    setQueryOptions({ ...queryOptions, [key]: value });
  };

  return { queryOptions, setQueryOptions, handleInputChange, setNewPair };
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

export function ItemSearchFilter({
  itemSearchOptions,
  setNewPair,
  inputContainerStyles,
  placeholder
}) {
  const boxProps = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const [modalState, setModalState] = useState({ open: false, itemValue: "" });

  const onChangeItem = (item) => {
    setNewPair(itemSearchOptions.inputName, item[itemSearchOptions.mainField]);
  }

  const customListItemOpts = {
    onClickValue: "all",
    listItemProps: {
      primary: "Todas",
    },
  };

  return (
    <React.Fragment>
      {modalState.open && (
        <SearchItemModal
          modalState={modalState}
          setModalState={setModalState}
          placeholder={placeholder}
          itemSearchOptions={itemSearchOptions}
          onChangeItem={onChangeItem}
          customListItemOpts={customListItemOpts}
        />
      )}
      <HeaderInputContainer
        boxProps={boxProps}
        inputContainerStyles={inputContainerStyles}
      >
        <TextField
          name={itemSearchOptions.inputName}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{
            readOnly: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ActionIconButton
                  toolTipTitle="Buscar"
                  iconButtonProps={{ style: { padding: 0 } }}
                  onClick={() => setModalState({ ...modalState, open: true })}
                >
                  <SearchIcon />
                </ActionIconButton>
              </InputAdornment>
            ),
          }}
          value={"all" === modalState.itemValue ? "" : modalState.itemValue}
        />
      </HeaderInputContainer>
    </React.Fragment>
  );
}

export function HeaderInputContainer(props) {
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
