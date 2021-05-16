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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useFetch from "use-http";
import { FormFooter } from "./formUtils";
import { useForm } from "react-hook-form";
import { SearchBar, useQueryOptions } from "./headerInputs";
import { fromObjectToQuery } from "./tables/tableUtils";
import { useHistory } from "react-router";

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

export function DeleteModal({
  open,
  setModal,
  deletePath,
  onSuccessDelete,
  redirectPath,
}) {
  const classes = useStyles();
  const { del, response, data } = useFetch(deletePath);
  const history = useHistory();

  const deleteItem = async () => {
    await del();
    if (response?.ok) {

      if (redirectPath) {
        history.replace(redirectPath);
      } else {
        setModal(false);
        onSuccessDelete();
      }
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

export function SearchItemModal({
  modalState,
  setModalState,
  placeholder,
  itemSearchOptions,
}) {
  const { queryOptions, handleInputChange } = useQueryOptions({
    search: "",
    limit: "5",
  });

  const itemEndPoint = fromObjectToQuery(
    itemSearchOptions.endpoint,
    queryOptions
  );

  const { data: getData = { results: [] } } = useFetch(itemEndPoint, [
    queryOptions,
  ]);

  const onItemSelected = (itemValue) => {
    setModalState({ open: false, itemValue: itemValue });
  };

  return (
    <BaseModal
      open={modalState.open}
      setModal={() => setModalState({ ...modalState, open: false })}
      title={placeholder}
    >
      <Box
        display="flex"
        flexDirection="column"
        p={2}
        maxHeight={650}
        style={{ overflowY: "scroll" }}
      >
        <SearchBar
          handleInputChange={handleInputChange}
          inputContainerStyles={{ maxWidth: null, width: null }}
        />
        {getData.results.map((item, index) => (
          <List key={index} component="div">
            <ListItem
              button
              onClick={() => onItemSelected(item[itemSearchOptions.mainField])}
            >
              <ListItemText
                primary={item[itemSearchOptions.mainField]}
                secondary={
                  <React.Fragment>
                    {itemSearchOptions?.secondaryFields?.map(
                      (secondaryField, index) => (
                        <React.Fragment key={index}>
                          {`${secondaryField.displayName} : ${
                            item[secondaryField.fieldName]
                          }`}
                          <br />
                        </React.Fragment>
                      )
                    )}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        ))}
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
  setModal,
}) {
  const { handleSubmit, ...formRest } = useForm(modalState.formArgs);

  return (
    <BaseModal title={title} open={modalState.open} setModal={setModal}>
      <Box p={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputBody {...formRest} />
        <FormFooter mt={2} title={buttonTitle} />
      </Box>
    </BaseModal>
  );
}
