import React from "react";
import PropTypes from "prop-types";
import { FormContainer } from "../commons/formUtils";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SimplePageHeader from "./SimplePageHeader";

export default function GenericItemForm({
  pageHeaderTitle,
  backPath,
  ...formContainerProps
}) {
  return (
    <React.Fragment>
      <SimplePageHeader
        title={pageHeaderTitle}
        buttonProps={{
          title: "Regresar",
          to: backPath,
          startIcon: <ArrowBack />,
        }}
      />
      <FormContainer
        {...formContainerProps}
      >
      </FormContainer>
    </React.Fragment>
  );
}

GenericItemForm.propTypes = {
  pageHeaderTitle: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  inputBody: PropTypes.func.isRequired,
  paperStyles: PropTypes.object,
  formTitles: PropTypes.exact({
    headerTitle: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired,
  }),
  useFormRequestArgs: PropTypes.object.isRequired,
};

/* 
inputRef={register({
            required: "Este campo es requerido",
            maxLength: {
              value: 70,
              message: "Demasiados caracteres",
            },
          })}
          error={errors.name ? true : false}
          helperText={errors?.name?.message}

*/
