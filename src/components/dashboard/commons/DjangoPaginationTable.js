import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import useFetch from "use-http";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Edit from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { Link as RouterLink } from "react-router-dom";

const usePagintationStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = usePagintationStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

/***

columnData:{
  fieldKey,
  colunmns,
}

column: {
  field,
  headerName,
  cellProps
}

***/
export default function DjangoPaginationTable({
  endPoint,
  columnData,
  queryOptions,
  tableContainerStyles,
  tableStyles,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginationEndpoint = fromObjectToQuery(endPoint, {
    ...{ limit: rowsPerPage, offset: rowsPerPage * page },
    ...queryOptions,
  });

  const {
    data: getData = { count: 0, results: [] },
  } = useFetch(paginationEndpoint, [page, rowsPerPage, queryOptions]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, getData.count - page * rowsPerPage);

  return (
    <TableContainer style={tableContainerStyles} component={Paper}>
      <Table style={tableStyles} aria-label="tabla de paginación">
        <TableHeader columns={columnData.columns} />
        <TableBody>
          {getData.results.map((row) => (
            <TableRow key={row[columnData.fieldKey]}>
              {columnData.columns.map((colunm, index) => (
                <TableCell key={index} {...colunm.cellProps}>
                  {row[colunm.field]}
                </TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Editar">
                  <IconButton
                    component={RouterLink}
                    to={`/dashboard/brands/update/${row[columnData.fieldKey]}`}
                    color="secondary"
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ver más">
                  <IconButton
                    component={RouterLink}
                    to={`/dashboard/brands/view/${row[columnData.fieldKey]}`}
                    color="secondary"
                  >
                    <ArrowForward />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[3, 5, 8]}
              colSpan={3}
              count={getData.count}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "filas por página" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
DjangoPaginationTable.propTypes = {
  endPoint: PropTypes.string.isRequired,
  columnData: PropTypes.object.isRequired,
  queryOptions: PropTypes.object,
  tableContainerStyles: PropTypes.object,
  tableStyles: PropTypes.object,
};

function TableHeader({ columns }) {
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

function fromObjectToQuery(enpoint, queryOptions) {
  const myUrl = new URL("http://127.0.0.1:8000");
  for (const property in queryOptions) {
    if (queryOptions[property]) {
      myUrl.searchParams.append(property, queryOptions[property]);
    }
  }
  return `${enpoint}/${myUrl.search}`;
}
