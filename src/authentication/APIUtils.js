import { createContext, useContext, useState } from "react";
export const APIContext = createContext();

export function useApiUtils() {
  return useContext(APIContext);
}

export function useApiWithAuthToken() {
  const currtoken = localStorage.getItem("authtoken");
  const [authToken, setToken] = useState(currtoken);
  const [httpStatus, setHttpStatus] = useState(0);

  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem("authtoken", token);
      setToken(token);
    } else {
      localStorage.removeItem("authtoken");
      setToken(null);
    }
  };

  const globalFetchOptions = {
    cachePolicy: "no-cache",
    interceptors: {
      request: async ({ options, url, path, route }) => {
        options.headers.Authorization = `Bearer ${authToken}`;
        return options;
      },
      response: async ({ response }) => {
        const res = response;
        if (isOverallError(res.status)) {
          setHttpStatus(res.status);
        }
        return res;
      },
    },
  };

  return { authToken, setAuthToken, globalFetchOptions, httpStatus };
}

function isOverallError(statusCode) {
  return [500, 405, 404, 403, 401].includes(statusCode);
}
