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
        currentUser: action.payload,
        isLoading: false,
      };

    case "USER_LOGOUT":
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };

    default:
      return true;
  }
};
