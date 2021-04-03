import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

export default function SimpleViewTable({
  keysData,
  data,
  tableContainerStyles,
  tableStyles,
}) {
  return (
    <TableContainer style={tableContainerStyles}>
      <Table style={tableStyles} aria-label="simple table de datos">
        <TableBody>
          {keysData.map((keyData, index) => (
            <TableRow key={index}>
              <TableCell {...keyData.cellProps}>{keyData.name}</TableCell>
              <TableCell {...keyData.cellProps}>
                {data[keyData.field] || "Cargando..."}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
