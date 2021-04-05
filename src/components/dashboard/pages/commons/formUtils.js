import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function SimpleForm({
  headerTitle,
  buttonTitle,
  nonFieldErros,
  handleSubmit,
  loading,
  children,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <FormHeader title={headerTitle}></FormHeader>
        {children}
        <NonFieldErrors errors={nonFieldErros}></NonFieldErrors>
        <FormFooter title={buttonTitle} loading={loading} />
      </FormContainer>
    </form>
  );
}

export function FormContainer({ paperStyles, children }) {
  const pStyles = {
    width: "100%",
    maxWidth: 950,
    padding: "1.5rem",
    ...paperStyles,
  };
  return <Paper style={pStyles}>{children}</Paper>;
}

export function FormHeader({ title }) {
  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: 5 }}>
        {title}
      </Typography>
      <Divider />
    </Box>
  );
}

export function NonFieldErrors({ errors, typographyProps }) {
  const tProps = {
    variant: "body2",
    color: "error",
    align: "left",
    ...typographyProps,
  };

  if (!errors) return <React.Fragment></React.Fragment>;

  return (
    <Box p={1}>
      {errors.map((error, index) => {
        return (
          <Typography key={index} {...tProps}>
            {error}
          </Typography>
        );
      })}
    </Box>
  );
}

export function FormFooter({ title, loading, boxProps }) {
  const bProps = {
    display: "flex",
    justifyContent: "flex-end",
    ...boxProps,
  };

  return (
    <Box {...bProps}>
      {loading && (
        <LinearProgress
          style={{ flexGrow: 1, alignSelf: "center", margin: "0 2rem" }}
        />
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        {title}
      </Button>
    </Box>
  );
}
