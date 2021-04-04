import React, { useState } from "react";
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles";

const useCardListStyles = makeStyles((theme) => ({
  cardList: {
    width: "100%",
    borderRadius: theme.typography.fontSize,
    marginTop: theme.spacing(2),
  },
}));

export default function CardList(props) {
  const classes = useCardListStyles();

  return <Paper className={classes.cardList}>{props.children}</Paper>;
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
