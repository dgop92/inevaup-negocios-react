import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import useFetch from "use-http";

//350, 300
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

function HeaderInputContainer(props) {
  const inputContainerStyles = {
    maxWidth: 300,
    width: "100%",
    ...props.inputContainerStyles,
  };
  return (
    <Box m={1} style={inputContainerStyles}>
      {props.children}
    </Box>
  );
}

export function CardListHeader(props) {
  return (
    <Box
      p={3}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
    >
      {props.children}
    </Box>
  );
}
