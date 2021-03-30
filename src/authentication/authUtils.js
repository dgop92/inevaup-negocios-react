import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthToken() {
  const currtoken = localStorage.getItem("authtoken");
  const [authToken, setToken] = useState(currtoken);

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
    interceptors: {
      request: async ({ options, url, path, route }) => {
        options.headers.Authorization = `Bearer ${authToken}`
        return options
      }
    }
    
  }

  return { authToken, setAuthToken, globalFetchOptions };
}
