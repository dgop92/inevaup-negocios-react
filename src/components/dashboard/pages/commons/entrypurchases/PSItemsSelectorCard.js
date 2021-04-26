import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CardList, CardListHeader, ItemSearch } from "../headerInputs";
import PSTable from "../tables/PSTable";
import { useForm } from "react-hook-form";
import { FormModal } from "../modals";

const columns = [
  {
    field: "product",
    headerName: "Codigo Producto",
  },
  {
    field: "amount",
    headerName: "Cantidad",
  },
];

const itemSearchOptions = {
  inputName: "product",
  endpoint: "/dashboard/products",
  mainField: "code",
  secondaryField: "name",
};

export default function PEItemsSelectorCard({
  childItems,
  setChildItems,
  updateAmountTitle,
}) {
  const { register, handleSubmit, errors } = useForm();
  const [updateModalState, setUpdateModalState] = useState({
    open: false,
    formArgs: undefined,
  });

  const onSubmit = (data) => {
    setChildItems([...childItems, data]);
  };

  const rowActions = {
    onUpdate: (index) => {
      setUpdateModalState({
        open: true,
        formArgs: {
          defaultValues: {
            childIndex: index,
            amount: childItems[index].amount,
          },
        },
      });
    },
    onDelete: (index) => {
      setChildItems(childItems.filter((_, i) => i !== index));
    },
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
          title={updateAmountTitle}
          buttonTitle="Actualizar"
          onSubmit={onUpdateItem}
          inputBody={AmountInputBody}
          modalState={updateModalState}
          setModal={(open) =>
            setUpdateModalState({
              open: open,
              formArgs: updateModalState.formArgs,
            })
          }
        />
      )}
      <CardList>
        <CardListHeader
          component="form"
          width="100%"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ItemSearch
            placeholder="Buscar producto"
            register={register}
            errors={errors}
            itemSearchOptions={itemSearchOptions}
            inputContainerStyles={{ maxWidth: 600 }}
          />
          <Box
            m={1}
            width="100%"
            maxWidth={300}
            display="flex"
            alignItems="center"
          >
            <AmountInputBody register={register} errors={errors} />
          </Box>
          <Box
            m={1}
            display="flex"
            alignItems="center"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <Button type="submit" variant="contained" color="primary">
              Agregrar
            </Button>
          </Box>
        </CardListHeader>
        <PSTable
          columns={columns}
          rows={childItems}
          tableStyles={{ minWidth: 400 }}
          rowActions={rowActions}
        />
      </CardList>
    </React.Fragment>
  );
}

function AmountInputBody({ register, errors }) {
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
        min: {
          value: 1,
          message: "La cantidad debe ser positiva",
        },
      })}
      error={errors.amount ? true : false}
      helperText={errors?.amount?.message}
    />
  );
}
