export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "SET_LOADING_FALSE":
      return {
        ...state,
        isLoading: false,
      };

    case "SET_LOADING_TRUE":
      return {
        ...state,
        isLoading: true,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        currentUser: {
          userId: action.payload.userId,
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
          bio: action.payload.bio,
        },
        isLoading: false,
      };

    case "USER_LOGOUT":
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "SET_CHATROOM_ID":
      return {
        ...state,
        chatroomId: action.payload.chatroomId,
      };

    default:
      return true;
  }
};
