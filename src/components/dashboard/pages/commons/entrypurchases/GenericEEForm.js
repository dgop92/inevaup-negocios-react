import React, { useState } from "react";
import SimplePageHeader from "../commons/SimplePageHeader";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { FormModal } from "../commons/modals";
import useFetch from "use-http";
import { TextField } from "@material-ui/core/TextField";
import PEItemsSelectorCard from "../commons/entrypurchases/PEItemsSelectorCard";

export default function GenericEEForm({pageHeaderTitle, endPointPaths}) {
  return (
    <React.Fragment>
      <SimplePageHeader
        title={pageHeaderTitle}
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: endPointPaths.itemPath,
        }}
      />
      <EEFormContainer endPointPaths={endPointPaths}/>
    </React.Fragment>
  );
}

function EEFormContainer({endPointPaths}) {
  const [childItems, setChildItems] = useState([]);
  const [updateModalState, setUpdateModalState] = useState({
    open: false,
    formArgs: undefined,
  });
  const { post } = useFetch(endPointPaths.childPaths.getPostEndPoint);

  const onSuccess = (responseData) => {
    const responsePk = responseData.pk;
    childItems.map(async (childItem) => {
      await post({
        ...childItem,
        entry: responsePk,
      });
    });
  };

  const onUpdateItem = (data) => {
    const updateIndex = updateModalState.formArgs.defaultValues.childIndex;
    setChildItems(
      childItems.map((childItem, index) => {
        if (index === updateIndex) childItem.amount = data.amount;
        return childItem;
      })
    );
  };

  return (
    <React.Fragment>
      {updateModalState.open && (
        <FormModal
          title="Actualizar Compra"
          buttonTitle="Actualizar"
          onSubmit={onUpdateItem}
          inputBody={UpdatePurchaseInputBody}
          modalState={updateModalState}
          setModal={(open) =>
            setUpdateModalState({
              open: open,
              formArgs: updateModalState.formArgs,
            })
          }
        />
      )}

      <PEItemsSelectorCard
        childItems={childItems}
        setChildItems={setChildItems}
        setUpdateModalState={setUpdateModalState}
      />

    </React.Fragment>
  );
}

function UpdatePurchaseInputBody({ register, errors }) {
  return (
    <TextField
      name="amount"
      label="Cantidad"
      size="small"
      fullWidth
      variant="outlined"
      type="number"
      inputRef={register({
        required: "Este campo es requerido",
        maxLength: {
          value: 70,
          message: "Demasiados caracteres",
        },
      })}
      error={errors.amount ? true : false}
      helperText={errors?.amount?.message}
    />
  );
}