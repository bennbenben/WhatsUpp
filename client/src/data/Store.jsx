import { createContext } from "react";

export const initialState = {
  currentUser: null,
  isLoading: false,
};

export const Store = createContext(null);
