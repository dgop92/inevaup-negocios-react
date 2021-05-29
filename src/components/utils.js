import React from "react";
import Typography from "@material-ui/core/Typography";

export function fromUTCDateStringToDisplayDate(UTCdate) {
  const localDate = new Date(UTCdate);
  return localDate.toLocaleString();
}

export function formatCurrency(n, localeCode, currencyCode) {
  return new Intl.NumberFormat(localeCode, {
    style: "currency",
    currency: currencyCode,
  }).format(n);
}

export function getValueFromRawValue(
  value,
  {
    undefinedMessage = "Cargando...",
    nullMessage = "Sin datos",
    formatFunction,
  } = {}
) {
  if (value === undefined) {
    return undefinedMessage;
  } else if (value === null) {
    return nullMessage;
  } else {
    return formatFunction ? formatFunction(value) : value;
  }
}

export function ValueTypography({
  value,
  preFixedString,
  getValueOptions,
  typographyProps,
}) {
  const valueToRender = getValueFromRawValue(value, getValueOptions);
  const pString = preFixedString || "";
  return (
    <Typography variant="body2" color="textSecondary" {...typographyProps}>
      {pString + valueToRender}
    </Typography>
  );
}
