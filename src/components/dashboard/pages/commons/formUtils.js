import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import useFetch from "use-http";
import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect, useParams } from "react-router";

export function FormContainer({
  paperStyles,
  useFormRequestArgs,
  formTitles,
  inputBody: InputBody,
}) {
  const pStyles = {
    width: "100%",
    padding: "1.5rem",
    ...paperStyles,
  };

  const { id } = useParams();
  if (useFormRequestArgs?.updateMode) useFormRequestArgs.updatePk = id;

  const {
    onSubmit,
    loading,
    nonFieldErros,
    successPath,
    ...inputProps
  } = useFormRequest(useFormRequestArgs);
  
  if (successPath) return <Redirect to={successPath} />;

  return (
    <Box mt={2} onSubmit={onSubmit} component="form">
      <Paper style={pStyles}>
        <FormHeader title={formTitles.headerTitle}></FormHeader>
        <InputBody {...inputProps} />
        <NonFieldErrors errors={nonFieldErros}></NonFieldErrors>
        <FormFooter title={formTitles.buttonTitle} loading={loading} />
      </Paper>
    </Box>
  );
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
      <Button type="submit" variant="contained" color="primary">
        {title}
      </Button>
    </Box>
  );
}

export function ForeginSelect({ selectOptions, control }) {
  const { data: getData = { results: [] } } = useFetch(
    selectOptions.endPoint,
    []
  );

  const [selectValue, setSelectValue] = useState(selectOptions.defaultValue);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <Controller
      name={selectOptions.fieldName}
      label={selectOptions.label}
      as={TextField}
      control={control}
      defaultValue={selectOptions.defaultValue}
      variant="outlined"
      fullWidth
      size="small"
      select
      value={selectValue}
      onChange={handleChange}
    >
      <MenuItem value={selectOptions.defaultValue}>
        {selectOptions.defaultValue}
      </MenuItem>
      {getData.results.map((item) => (
        <MenuItem
          key={item[selectOptions.retrieveField]}
          value={item[selectOptions.retrieveField]}
        >
          {item[selectOptions.retrieveField]}
        </MenuItem>
      ))}
    </Controller>
  );
}

export function useFormRequest({
  itemPath = "",
  updatePk = 0,
  updateWithPatch = false,
  onSuccess = () => {},
} = {}) {
  const [successPath, setSuccessPath] = useState("");

  const endPoint = updatePk ? `${itemPath}${updatePk}` : itemPath;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    errors,
  } = useForm();
  const {
    get,
    post,
    put,
    patch,
    response,
    loading,
    data: resData,
  } = useFetch();

  const onSubmit = handleSubmit(async (data) => {
    let responseData;
    if (updatePk) {
      responseData = updateWithPatch
        ? await patch(endPoint, data)
        : await put(endPoint, data);
    } else {
      responseData = await post(endPoint, data);
    }
    if (response.ok) {
      onSuccess(responseData);
      setSuccessPath(`${itemPath}view/${responseData["pk"]}`);
    } else {
      setResponseErrors(setError, responseData);
    }
  });

  const loadDefaultData = useCallback(async () => {
    const itemData = await get(endPoint);
    if (response.ok) setDefaultValues(setValue, itemData);
  }, [get, endPoint, response, setValue]);

  const nonFieldErros = resData?.non_field_errors;

  useEffect(() => {
    if (updatePk) {
      loadDefaultData();
    }
  }, [updatePk, loadDefaultData]);

  return {
    control,
    register,
    onSubmit,
    errors,
    loading,
    nonFieldErros,
    successPath,
  };
}

export function setResponseErrors(setError, responseErrors) {
  for (const key in responseErrors) {
    setError(key, {
      type: "response",
      message: responseErrors[key].join(","),
    });
  }
}

export function setDefaultValues(setValue, defaultData) {
  for (const key in defaultData) {
    if (key !== "pk") setValue(key, defaultData[key]);
  }
}
