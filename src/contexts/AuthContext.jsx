import { createContext, useContext } from "react";

const AuthContext = createContext();

export function useBudgets() {
  return useContext(AuthContext);
}