export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "TEST_ACTION":
      return {
        ...state,
        isLoading: false,
      };

    case "INIT_USER_LOGIN":
    case "INIT_PASSWORD_RESET":
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

    case "USER_LOGIN_FAILURE":
    case "PASSWORD_RESET_OUTCOME":
      return {
        ...state,
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
