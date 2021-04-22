import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

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

export default function UpdateModal({
  open,
  setModal,
  modalTitle,
  children,
}) {
  const classes = useStyles();

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
            id="update-modal-title"
            component="h6"
            variant="h6"
            style={{ flexGrow: 1 }}
          >
            {modalTitle}
          </Typography>
          <IconButton color="inherit" onClick={() => setModal(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box p={2}>
          {children}
        </Box>
      </div>
    </Modal>
  );
}
