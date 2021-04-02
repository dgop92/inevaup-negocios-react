import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  itemTable: {
    minWidth: 350,
  },
}));
//use headerNames o colunmNames to create the rows
export default function ItemTable({ columns, rows, colunmKey }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.itemTable} aria-label="simple table">
        <TableHeader columns={columns} />
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[colunmKey]}>
              {columns.map((colunm, index) => (
                <TableCell key={index}>{row[colunm.dataName]}</TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Ver más">
                  <IconButton color="secondary">
                    <ArrowForward />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TableHeader({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((colunm, index) => (
          <TableCell key={index}>{colunm.name}</TableCell>
        ))}
        <TableCell align="right">Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
}
