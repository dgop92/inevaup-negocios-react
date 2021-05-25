import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";

export function AmountInputBody({ control, errors }) {
  return (
    <Controller
      as={TextField}
      control={control}
      name="amount"
      label="Cantidad"
      size="small"
      fullWidth
      variant="outlined"
      type="number"
      rules={{
        required: "Este campo es requerido",
        maxLength: {
          value: 70,
          message: "Demasiados caracteres",
        },
        min: {
          value: 1,
          message: "La cantidad debe ser positiva",
        },
      }}
      defaultValue=""
      error={errors.amount ? true : false}
      helperText={errors?.amount?.message}
    ></Controller>
  );
}

export function UnitPriceInputBody({ control, errors }) {
  return (
    <Controller
      as={TextField}
      control={control}
      name="unit_price"
      label="Precio Unitario"
      size="small"
      fullWidth
      variant="outlined"
      type="number"
      rules={{
        required: "Este campo es requerido",
        maxLength: {
          value: 18,
          message: "Demasiados caracteres",
        },
        min: {
          value: 1,
          message: "La cantidad debe ser positiva",
        },
      }}
      inputProps={{ step: 0.01 }}
      defaultValue=""
      error={errors.unit_price ? true : false}
      helperText={errors?.unit_price?.message}
    />
  );
}

export default function PSInputBody({ control, errors }) {
  return (
    <Box display="grid" gridGap="1rem" my={2}>
      <AmountInputBody control={control} errors={errors} />
      <UnitPriceInputBody control={control} errors={errors} />
    </Box>
  );
}
