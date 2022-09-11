import { createContext } from "react";

export const initialState = {
  currentUser: {
    userId: null,
    username: null,
    email: null,
    avatar: null,
    bio: null,
  },
  chatroomId: null,
  isLoading: false,
};

export const Store = createContext(null);
