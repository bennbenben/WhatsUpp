import { createContext } from "react";

export const initialState = {
  isLoading: false,
  currentUser: {
    userId: null,
    username: null,
    email: null,
    avatar: null,
    bio: null,
  },
  chatroomId: null,
  updateSenderChatroom: false,
};

export const Store = createContext(null);
