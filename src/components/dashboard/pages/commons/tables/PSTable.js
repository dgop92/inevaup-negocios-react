import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import {
  OnClickRowActions,
  TableHeader,
} from "./tableUtils";

export default function PSTable({
  rows,
  tableContainerStyles,
  tableStyles,
  columns,
  rowActions,
}) {
  columns.forEach((col) => {
    if (!col.displayFunction) {
      col.displayFunction = (value) => value;
    }
  });

  const emptyRows = 5 - rows.length;

  return (
    <TableContainer style={tableContainerStyles} component={Paper}>
      <Table style={tableStyles} aria-label="pe table">
        <TableHeader columns={columns} />
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((colunm, index) => (
                <TableCell key={index} {...colunm.cellProps}>
                  {colunm.displayFunction(row[colunm.field])}
                </TableCell>
              ))}
              <OnClickRowActions rowActions={rowActions} index={index} />
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
