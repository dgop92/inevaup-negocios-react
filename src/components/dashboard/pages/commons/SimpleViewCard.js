import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

const useCardStyles = makeStyles((theme) => ({
  baseCard: {
    width: "100%",
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

export default function SimpleViewCard(props) {
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
        {props.children}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          component={RouterLink}
          to={props.updatePath}
          variant="text"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
        >
          Modificar
        </Button>
        <DeleteButton
          component={RouterLink}
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
  },
}))(Button);
