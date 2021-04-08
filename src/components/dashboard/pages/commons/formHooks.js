import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import useFetch from "use-http";

export function useFormRequest(itemPath, updatePk) {
  const [successPath, setSuccessPath] = useState("");

  const endPoint = updatePk ? `${itemPath}${updatePk}` : itemPath;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    errors,
  } = useForm();
  const { get, post, put, response, loading, data: resData } = useFetch();

  const onSubmit = handleSubmit(async (data) => {
    let responseData;
    if (updatePk) {
      responseData = await put(endPoint, data);
    } else {
      responseData = await post(endPoint, data);
    }
    if (response.ok) {
      setSuccessPath(`${itemPath}view/${responseData["pk"]}`);
    } else {
      setResponseErrors(setError, responseData);
    }
  });

  const loadDefaultData = useCallback(async () => {
    const itemData = await get(endPoint);
    if (response.ok) setDefaultValues(setValue, itemData);
  }, [get, endPoint, response, setValue]);

  const nonFieldErros = resData?.non_field_errors;

  useEffect(() => {
    if (updatePk) {
      loadDefaultData();
    }
  }, [updatePk, loadDefaultData]);

  return {
    control,
    register,
    onSubmit,
    errors,
    loading,
    nonFieldErros,
    successPath,
  };
}

export function setResponseErrors(setError, responseErrors) {
  for (const key in responseErrors) {
    setError(key, {
      type: "response",
      message: responseErrors[key].join(","),
    });
  }
}

export function setDefaultValues(setValue, defaultData) {
  for (const key in defaultData) {
    if (key !== "pk") setValue(key, defaultData[key]);
  }
}
