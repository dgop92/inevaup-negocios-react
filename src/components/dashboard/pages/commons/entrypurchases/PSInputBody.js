import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

export function AmountInputBody({ register, errors }) {
  return (
    <TextField
      name="amount"
      label="Cantidad"
      size="small"
      fullWidth
      variant="outlined"
      type="number"
      inputRef={register({
        required: "Este campo es requerido",
        maxLength: {
          value: 70,
          message: "Demasiados caracteres",
        },
        min: {
          value: 1,
          message: "La cantidad debe ser positiva",
        },
      })}
      error={errors.amount ? true : false}
      helperText={errors?.amount?.message}
    />
  );
}

export function UnitPriceInputBody({ register, errors }) {
  return (
    <TextField
      name="unit_price"
      label="Precio Unitario"
      size="small"
      fullWidth
      variant="outlined"
      type="number"
      inputProps={{step: 0.01}}
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
      error={errors.unit_price ? true : false}
      helperText={errors?.unit_price?.message}
    />
  );
}

export default function PSInputBody({ register, errors }) {
  return (
    <Box display="grid" gridGap="1rem" my={2}>
      <AmountInputBody register={register} errors={errors} />
      <UnitPriceInputBody register={register} errors={errors} />
    </Box>
  );
}
