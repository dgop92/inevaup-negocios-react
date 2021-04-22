import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import useFetch from "use-http";
import { Redirect } from "react-router";

const modalStyles = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    position: "absolute",
    maxWidth: 600,
    width: "90vw",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    "&:focus": {
      outline: "none",
    },
  },
  footerButton: {
    margin: theme.spacing(0.5),
  },
}));

export default function DeleteModal({
  open,
  setModal,
  itemPath,
  pkPath,
  protectedErrorMessage,
  noredirect
}) {
  const classes = useStyles();

  const { del, response } = useFetch(`${itemPath}${pkPath}`);

  const deleteItem = () => del();

  if (!noredirect && response?.ok) return <Redirect to={itemPath} />;

  return (
    <Modal
      open={open}
      onClose={() => setModal(false)}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <div style={modalStyles} className={classes.modalContainer}>
        <Box p={2} display="flex" alignItems="center">
          <Typography
            id="delete-modal-title"
            component="h6"
            variant="h6"
            style={{ flexGrow: 1 }}
          >
            Advertencia
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setModal(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography id="delete-modal-content" variant="body1" component="p">
            ¿Estas seguro de eliminar este elemento?
          </Typography>
        </Box>
        <Divider />
        {response?.status === 423 && (
          <Box py={1} px={2}>
            <Typography
              color="error"
              id="delete-modal-content"
              variant="body1"
              component="p"
            >
              {protectedErrorMessage}
            </Typography>
          </Box>
        )}
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button
            className={classes.footerButton}
            variant="outlined"
            color="inherit"
            onClick={() => setModal(false)}
          >
            Cancelar
          </Button>
          <DeleteButton
            className={classes.footerButton}
            variant="contained"
            color="primary"
            onClick={deleteItem}
          >
            Eliminar
          </DeleteButton>
        </Box>
      </div>
    </Modal>
  );
}

const DeleteButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);
