import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { CardList, CardListHeader } from "../headerInputs";
import PSTable from "../tables/PSTable";
import { useForm } from "react-hook-form";
import { FormModal } from "../modals";
import PSInputBody, {
  AmountInputBody,
  UnitPriceInputBody,
} from "./PSInputBody";
import { ItemSearch } from "../formUtils";
import { formatCurrency } from "../../../../utils";

const columns = [
  {
    field: "product",
    headerName: "Codigo Producto",
  },
  {
    field: "amount",
    headerName: "Cantidad",
  },
  {
    field: "unit_price",
    headerName: "Precio Unitario",
    displayFunction: (value) => formatCurrency(value, "es-CO", "COP"),
  },
];

const itemSearchOptions = {
  inputName: "product",
  endpoint: "/dashboard/products",
  mainField: "code",
  secondaryFields: [
    { displayName: "Nombre", fieldName: "name" },
    {
      displayName: "Precio venta",
      fieldName: "sale_price",
      displayFunction: (value) => formatCurrency(value, "es-CO", "COP"),
    },
    {
      displayName: "Precio compra",
      fieldName: "purchase_price",
      displayFunction: (value) => formatCurrency(value, "es-CO", "COP"),
    },
    { displayName: "Stock", fieldName: "stock" },
  ],
};

export default function PEItemsSelectorCard({
  childItems,
  setChildItems,
  updateAmountTitle,
}) {
  const { control, register, handleSubmit, errors, setValue, reset } =
    useForm();
  const [updateModalState, setUpdateModalState] = useState({
    open: false,
    formArgs: undefined,
  });

  const onSubmit = (data) => {
    setChildItems([...childItems, data]);
    reset();
  };

  const rowActions = {
    onUpdate: (index) => {
      setUpdateModalState({
        open: true,
        formArgs: {
          defaultValues: {
            childIndex: index,
            amount: childItems[index].amount,
            unit_price: childItems[index].unit_price,
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
        if (index === updateIndex) {
          childItem.amount = data.amount;
          childItem.unit_price = data.unit_price;
        }
        return childItem;
      })
    );
    setUpdateModalState({ ...updateModalState, open: false });
  };

  const onChangeItem = (item) => {
    if (window.location.pathname.includes("entries")) {
      setValue("unit_price", item?.purchase_price || "");
    } else {
      setValue("unit_price", item?.sale_price || "");
    }
  };

  return (
    <React.Fragment>
      {updateModalState.open && (
        <FormModal
          title={updateAmountTitle}
          buttonTitle="Actualizar"
          onSubmit={onUpdateItem}
          inputBody={PSInputBody}
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
            inputContainerStyles={{ maxWidth: 450 }}
            onChangeItem={onChangeItem}
          />
          <Box
            m={1}
            width="100%"
            maxWidth={300}
            display="flex"
            alignItems="center"
          >
            <AmountInputBody control={control} errors={errors} />
          </Box>
          <Box
            m={1}
            width="100%"
            maxWidth={300}
            display="flex"
            alignItems="center"
          >
            <UnitPriceInputBody control={control} errors={errors} />
          </Box>
          <Box
            m={1}
            display="flex"
            alignItems="center"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <Button type="submit" variant="contained" color="primary">
              Agregar
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
