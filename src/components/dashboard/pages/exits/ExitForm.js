import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormFooter } from "../commons/formUtils";
import SimplePageHeader from "../commons/SimplePageHeader";
import ArrowBack from "@material-ui/icons/ArrowBack";
import useFetch from "use-http";
import PSItemsSelectorCard from "../commons/entrypurchases/PSItemsSelectorCard";
import { useForm } from "react-hook-form";
import GeneralFormContainer from "../commons/entrypurchases/GeneralFormContainer";
import { Redirect } from "react-router";
import { useSnackbar } from "notistack";
import { formatCurrency, ValueTypography } from "../../../utils";

function roundTo2Places(num) {
  return Math.round(num * 100) / 100;
}

export default function ExitForm({ endPointPaths, inputBody: InputBody }) {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Crear Salida"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: endPointPaths.itemPath,
        }}
      />
      <ExitFormContainer endPointPaths={endPointPaths} inputBody={InputBody} />
    </React.Fragment>
  );
}

function ExitFormContainer({ endPointPaths, inputBody: InputBody }) {
  const [childItems, setChildItems] = useState([]);
  const { response, post, loading } = useFetch();
  const { handleSubmit, register, errors, watch } = useForm();
  const [successPk, setSuccessPk] = useState(0);
  const [exitPaymentState, setExitPaymentState] = useState({
    totalToPay: 0,
    moneyToReturn: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  const watchRecieveValue = watch("recieve_value", 0);

  useEffect(() => {
    let totalToPay = 0;
    for (const item of childItems) {
      totalToPay += Number(item.amount) * Number(item.unit_price);
    }
    setExitPaymentState((exitPaymentState) => ({
      ...exitPaymentState,
      totalToPay: roundTo2Places(totalToPay),
    }));
  }, [childItems, setExitPaymentState]);

  useEffect(() => {
    try {
      const recieveValue = Number(watchRecieveValue);
      setExitPaymentState((exitPaymentState) => ({
        ...exitPaymentState,
        moneyToReturn: roundTo2Places(
          recieveValue - exitPaymentState.totalToPay
        ),
      }));
    } catch (error) {}
  }, [watchRecieveValue, exitPaymentState.totalToPay, setExitPaymentState]);

  const onSuccess = async (responseData) => {
    if (response.ok) {
      const responsePk = responseData.pk;
      let childError = false;
      for (const childItem of childItems) {
        await post(endPointPaths.childPaths.getPostEndPoint, {
          ...childItem,
          exit: responsePk,
        });
        if (!response.ok) {
          childError = true;
        }
      }
      if (childError) {
        enqueueSnackbar(
          "No hubo suficiente stock para algunos productos de esta salida, recomendamos revisar los items",
          {
            variant: "error",
            autoHideDuration: 10000,
          }
        );
      }
      setSuccessPk(responsePk);
    }
  };

  const onSubmitParent = async (data) => {
    const parentData = data?.client ? data : {};
    const responseData = await post(
      endPointPaths.parentPaths.getPostEndPoint,
      parentData
    );
    if (response.ok) {
      onSuccess(responseData);
    }
  };

  if (successPk) {
    return <Redirect to={endPointPaths.getSuccessPath(successPk)} />;
  }

  return (
    <React.Fragment>
      <GeneralFormContainer>
        <InputBody register={register} errors={errors} />
      </GeneralFormContainer>
      <PSItemsSelectorCard
        childItems={childItems}
        setChildItems={setChildItems}
        updateAmountTitle="Actualizar venta"
      />
      <Box mt={2}>
        <Paper
          style={{
            width: "100%",
            padding: "1.5rem",
          }}
        >
          <Grid container spacing={2} style={{ padding: "1rem 0" }}>
            <Grid item lg={4} md={6} xs={12}>
              <Typography
                variant="body1"
                style={{ fontWeight: 500, margin: "0.2rem 0" }}
              >
                Total a pagar:
              </Typography>
              <ValueTypography
                value={exitPaymentState.totalToPay}
                getValueOptions={{
                  formatFunction: (value) =>
                    formatCurrency(value, "es-CO", "COP"),
                }}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Typography
                variant="body1"
                style={{ fontWeight: 500, margin: "0.2rem 0" }}
              >
                Cambio
              </Typography>
              <ValueTypography
                value={exitPaymentState.moneyToReturn}
                getValueOptions={{
                  formatFunction: (value) =>
                    formatCurrency(value, "es-CO", "COP"),
                }}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                name="recieve_value"
                label="Valor recibido"
                size="small"
                fullWidth
                variant="standard"
                type="number"
                inputProps={{ step: 0.01 }}
                inputRef={register({
                  required: "Este campo es requerido",
                  maxLength: {
                    value: 18,
                    message: "Demasiados caracteres",
                  },
                  min: {
                    value: 1,
                    message: "La cantidad debe ser positiva",
                  },
                })}
                error={errors.recieve_value ? true : false}
                helperText={errors?.recieve_value?.message}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <FormFooter
        title="Crear Salida"
        loading={loading}
        elevation={2}
        buttonProps={{
          type: "button",
          onClick: handleSubmit(onSubmitParent),
        }}
        mt={2}
        p={2}
        component={Paper}
      />
    </React.Fragment>
  );
}
