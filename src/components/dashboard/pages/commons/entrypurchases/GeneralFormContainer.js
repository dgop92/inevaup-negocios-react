import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { FormHeader } from "../formUtils";

export default function GeneralFormContainer(props) {
  const pStyles = {
    width: "100%",
    padding: "1.5rem",
  };
  return (
    <Box mt={2}>
      <Paper style={pStyles}>
        <FormHeader title="General"></FormHeader>
        {props.children}
      </Paper>
    </Box>
  );
}
