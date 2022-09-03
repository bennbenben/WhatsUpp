import { createContext } from "react";

export const initialState = {
  currentUser: null,
  isLoading: true,
};

export const Store = createContext(null);
