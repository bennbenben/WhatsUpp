const action_types = {
  SET_LOADING_FALSE: "SET_LOADING_FALSE",
  SET_LOADING_TRUE: "SET_LOADING_TRUE",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGOUT: "USER_LOGOUT",
};

export const setLoadingFalse = () => ({
  type: action_types.SET_LOADING_FALSE,
});

export const setLoadingTrue = () => ({
  type: action_types.SET_LOADING_TRUE,
});

export const userLoginSuccess = (currentUser) => ({
  type: action_types.USER_LOGIN_SUCCESS,
  payload: currentUser,
});

export const userLogout = () => ({
  type: action_types.USER_LOGOUT,
});
