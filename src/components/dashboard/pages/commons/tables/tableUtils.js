import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { Link as RouterLink } from "react-router-dom";

export function OnClickRowActions({ rowActions, pk }) {
  return (
    <TableCell align="right">
      <ActionIconButton
        toolTipTitle="Editar"
        onClick={() => rowActions.onUpdate(pk)}
      >
        <EditIcon />
      </ActionIconButton>
      <ActionIconButton
        toolTipTitle="Eliminar"
        onClick={() => rowActions.onDelete(pk)}
      >
        <DeleteIcon />
      </ActionIconButton>
    </TableCell>
  );
}

export function LinkIconButton(props) {
  return (
    <Tooltip title={props.toolTipTitle}>
      <IconButton component={RouterLink} to={props.to} color="secondary">
        {props.children}
      </IconButton>
    </Tooltip>
  );
}

export function ActionIconButton(props) {
  return (
    <Tooltip title={props.toolTipTitle}>
      <IconButton onClick={props.onClick} color="secondary">
        {props.children}
      </IconButton>
    </Tooltip>
  );
}

export function TableHeader({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((colunm, index) => (
          <TableCell key={index} {...colunm.cellProps}>
            {colunm.headerName}
          </TableCell>
        ))}
        <TableCell align="right">Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
}

export function fromObjectToQuery(enpoint, queryOptions) {
  const myUrl = new URL("http://127.0.0.1:8000");
  for (const property in queryOptions) {
    if (queryOptions[property] && queryOptions[property] !== "all") {
      myUrl.searchParams.append(property, queryOptions[property]);
    }
  }
  return `${enpoint}/${myUrl.search}`;
}