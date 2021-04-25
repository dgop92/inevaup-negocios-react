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
import { FormFooter } from "./formUtils";
import { useForm } from "react-hook-form";

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

export function BaseModal({ open, setModal, title, children }) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={() => setModal(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div style={modalStyles} className={classes.modalContainer}>
        <ModalHeader title={title} setModal={setModal} />
        {children}
      </div>
    </Modal>
  );
}

export function ModalHeader({ title, setModal }) {
  return (
    <React.Fragment>
      <Box p={2} display="flex" alignItems="center">
        <Typography component="h6" variant="h6" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton color="inherit" onClick={() => setModal(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
    </React.Fragment>
  );
}

export function DeleteModal({ open, setModal, deletePath, onSuccessDelete}) {
  const classes = useStyles();
  const { del, response, data } = useFetch(deletePath);

  const deleteItem = () => del();

  if (response?.ok) {
    const newComponent = onSuccessDelete();
    if (newComponent) {
      return newComponent;
    }
  }
  return (
    <BaseModal title="Avertencia" open={open} setModal={setModal}>
      <Box p={2}>
        <Typography variant="body1" component="p">
          ¿Estas seguro de eliminar este elemento?
        </Typography>
      </Box>
      <Divider />
      {response?.status === 423 && (
        <Box py={1} px={2}>
          <Typography color="error" variant="body1" component="p">
            {data?.detail}
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
    </BaseModal>
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

export function FormModal({
  title,
  buttonTitle,
  onSubmit,
  inputBody: InputBody,
  modalState,
  setModal
}) {
  const { handleSubmit, ...formRest } = useForm(modalState.formArgs);

  return (
    <BaseModal title={title} open={modalState.open} setModal={setModal}>
      <Box p={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputBody {...formRest} />
        <FormFooter boxProps={{ mt: 2 }} title={buttonTitle} />
      </Box>
    </BaseModal>
  );
}