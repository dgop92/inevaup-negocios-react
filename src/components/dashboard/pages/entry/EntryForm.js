import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { ForeginSelect, FormFooter } from "../commons/formUtils";
import SimplePageHeader from "../commons/SimplePageHeader";
import ArrowBack from "@material-ui/icons/ArrowBack";
import useFetch from "use-http";
import PSItemsSelectorCard from "../commons/entrypurchases/PSItemsSelectorCard";
import GeneralFormContainer from "../commons/entrypurchases/GeneralFormContainer";
import { useForm } from "react-hook-form";

export default function EntryForm({ endPointPaths }) {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Crear Entrada"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: endPointPaths.itemPath,
        }}
      />
      <EntryFormContainer endPointPaths={endPointPaths} />
    </React.Fragment>
  );
}

function EntryFormContainer({ endPointPaths }) {
  const [childItems, setChildItems] = useState([]);
  const { response, post, loading } = useFetch();
  const { handleSubmit, control } = useForm();

  const onSuccess = (responseData) => {
    const responsePk = responseData.pk;
    childItems.map(async (childItem) => {
      await post(endPointPaths.childPaths.getPostEndPoint, {
        ...childItem,
        entry: responsePk,
      });
    });
  };

  //it is imposible to have a bad request error in client
  const onSubmitParent = async (data) => {
    const responseData = await post(
      endPointPaths.parentPaths.getPostEndPoint,
      data
    );
    if (response.ok) {
      onSuccess(responseData);
    }
  };

  return (
    <React.Fragment>
      <GeneralFormContainer>
        <EntryInputBody control={control} />
      </GeneralFormContainer>
      <PSItemsSelectorCard
        childItems={childItems}
        setChildItems={setChildItems}
        updateAmountTitle="Actualizar Compra"
      />
      <FormFooter
        title="Crear Entrada"
        loading={loading}
        elevation={2}
        buttonProps={{
          type: "button",
          onClick: handleSubmit(onSubmitParent),
        }}
        mt={2}
        p={2}
        component={Paper}
      />
    </React.Fragment>
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
