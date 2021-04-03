import React from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SimplePageHeader from "../commons/SimplePageHeader";
import { useParams } from "react-router";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import SimpleViewTable from "../commons/SimpleViewTable";
import useFetch from "use-http";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const useCardStyles = makeStyles((theme) => ({
  baseCard: {
    width: "100%",
    // maxWidth: 500,
  },
  cardContent: {
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  cardActions: {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    justifyContent: "flex-end",
  },
}));

const keysData = [
  {
    field: "name",
    name: "Nombre",
  },
];

export default function BrandView() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Ver Marca"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/brands",
        }}
      />
      <MainViewContent />
    </React.Fragment>
  );
}

function MainViewContent() {
  const classes = useStyles();

  const { id } = useParams();
  const { data: brandData = {} } = useFetch(`/dashboard/brands/${id}`, []);

  return (
    <Box mt={2} className={classes.boxContainer}>
      <InfoCard data={brandData}></InfoCard>
    </Box>
  );
}

function InfoCard({ data }) {
  const classes = useCardStyles();
  return (
    <Card className={classes.baseCard}>
      <CardHeader
        title="General"
        titleTypographyProps={{
          variant: "body1",
          style: { fontWeight: 500 },
        }}
      />
      <CardContent className={classes.cardContent}>
        <Divider />
        <SimpleViewTable keysData={keysData} data={data} />
      </CardContent>
      <CardActions className={classes.cardActions}>
      <Button
          variant="text"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
        >
          Modificar
        </Button>
        <DeleteButton
          variant="text"
          color="primary"
          size="small"
          startIcon={<DeleteIcon />}
        >
          Eliminar
        </DeleteButton>
      </CardActions>
    </Card>
  );
}

const DeleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: red[50],
    },
  }
}))(Button);
