import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        p={3}
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1" color="textPrimary">
          Home Temporal 
        </Typography>
      </Box>
    </React.Fragment>
  );
}
