import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { FormFooter } from "../commons/formUtils";
import SimplePageHeader from "../commons/SimplePageHeader";
import ArrowBack from "@material-ui/icons/ArrowBack";
import useFetch from "use-http";
import PSItemsSelectorCard from "../commons/entrypurchases/PSItemsSelectorCard";
import { useForm } from "react-hook-form";
import GeneralFormContainer from "../commons/entrypurchases/GeneralFormContainer";

export default function ExitForm({ endPointPaths, inputBody: InputBody }) {
  return (
    <React.Fragment>
      <SimplePageHeader
        title="Crear Salida"
        buttonProps={{
          title: "Regresar",
          startIcon: <ArrowBack />,
          to: endPointPaths.itemPath,
        }}
      />
      <ExitFormContainer endPointPaths={endPointPaths} inputBody={InputBody} />
    </React.Fragment>
  );
}

function ExitFormContainer({ endPointPaths, inputBody: InputBody }) {
  const [childItems, setChildItems] = useState([]);
  const { response, post, loading } = useFetch();
  const { handleSubmit, register, errors } = useForm();

  const onSuccess = async (responseData) => {
    if (response.ok) {
      const responsePk = responseData.pk;
      childItems.map(async (childItem) => {
        const res = await post(endPointPaths.childPaths.getPostEndPoint, {
          ...childItem,
          exit: responsePk,
        });
        if (!res.ok){
          console.log("SNAKBAR")
        }
      });
    }
  };

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
        <InputBody register={register} errors={errors} />
      </GeneralFormContainer>
      <PSItemsSelectorCard
        childItems={childItems}
        setChildItems={setChildItems}
        updateAmountTitle="Actualizar venta"
      />
      <FormFooter
        title="Crear Salida"
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