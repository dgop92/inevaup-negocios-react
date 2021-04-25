import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {
  ForeginSelect,
  FormFooter,
  FormHeader,
  NonFieldErrors,
  useFormRequest,
} from "../commons/formUtils";
import SimplePageHeader from "../commons/SimplePageHeader";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { CardList, CardListHeader, ItemSearch } from "../commons/headerInputs";
import PSTable from "../commons/tables/PSTable";
import { FormModal } from "../commons/modals";
import { useForm } from "react-hook-form";
import useFetch from "use-http";

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

export default function EntryCreate() {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Crear Entrada"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: "/dashboard/entries",
        }}
      />
      <CreateFormContainer />
    </React.Fragment>
  );
}

function CreateFormContainer() {
  const [childItems, setChildItems] = useState([]);
  const [updateModalState, setUpdateModalState] = useState({
    open: false,
    formArgs: undefined,
  });
  const { post } = useFetch("/dashboard/purchases/")

  const onSuccess = (responseData) => {
    console.log(responseData);
    const responsePk = responseData.pk
    childItems.map(async (childItem) => {
      await post({
        ...childItem,
        entry: responsePk,
      }) 
    })
  };

  const rowActions = {
    onUpdate: async (index) => {
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
      <GeneralForm
        formTitles={{
          headerTitle: "Crear nueva Entrada",
          buttonTitle: "Crear",
        }}
        useFormRequestArgs={{
          itemPath: "/dashboard/entries/",
          onSuccess: onSuccess,
        }}
        inputBody={EntryInputBody}
      />

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

      <CardList>
        <CardListContent childItems={childItems} setChildItems={setChildItems}/>
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

function CardListContent({childItems, setChildItems}) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setChildItems([...childItems, data])
  };

  return (
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
      <Box m={1} width="100%" maxWidth={300} display="flex" alignItems="center">
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
  );
}

function GeneralForm({ formTitles, useFormRequestArgs, inputBody: InputBody }) {
  const pStyles = {
    width: "100%",
    padding: "1.5rem",
  };

  const { onSubmit, loading, nonFieldErros, ...inputProps } = useFormRequest(
    useFormRequestArgs
  );

  return (
    <Box mt={2} onSubmit={onSubmit} component="form">
      <Paper style={pStyles}>
        <FormHeader title={formTitles.headerTitle}></FormHeader>
        <InputBody {...inputProps} />
        <NonFieldErrors errors={nonFieldErros}></NonFieldErrors>
        <FormFooter title={formTitles.buttonTitle} loading={loading} />
      </Paper>
    </Box>
  );
}

function EntryInputBody({ control }) {
  return (
    <Box my={2}>
      <Box style={{ maxWidth: 450, width: "100%" }}>
        <ForeginSelect
          selectOptions={{
            endPoint: "/dashboard/providers",
            fieldName: "provider",
            retrieveField: "name",
            label: "Proveedor",
            defaultValue: "Sin Proveedor",
          }}
          control={control}
        />
      </Box>
    </Box>
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
