import { createContext } from "react";

export const initialState = {
  currentUser: {
    userId: null,
    email: null,
    avatar: null,
    bio: null,
  },
  chatroomId: null,
  isLoading: false,
};

export const Store = createContext(null);
