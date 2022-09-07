import { createContext } from "react";

export const initialState = {
  currentUser: {
    userId: null,
    email: null,
    avatar: null,
    bio: null,
  },
  isLoading: false,
};

export const Store = createContext(null);
