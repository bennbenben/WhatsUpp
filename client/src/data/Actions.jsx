const action_types = {
  TEST_ACTION: "TEST_ACTION",
  INIT_USER_LOGIN: "INIT_USER_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAILURE: "USER_LOGIN_FAILURE",
  USER_LOGOUT: "USER_LOGOUT",
  INIT_PASSWORD_RESET: "INIT_PASSWORD_RESET",
  PASSWORD_RESET_OUTCOME: "PASSWORD_RESET_OUTCOME",
};

// export const testAction = () => ({
//   type: action_types.TEST_ACTION,
// });

export const initUserLogin = () => ({
  type: action_types.INIT_USER_LOGIN,
});

export const userLoginSuccess = (currentUser) => ({
  type: action_types.USER_LOGIN_SUCCESS,
  payload: currentUser,
});

export const userLoginFailure = () => ({
  type: action_types.USER_LOGIN_FAILURE,
});

export const userLogout = () => ({
  type: action_types.USER_LOGOUT,
});

export const initPasswordReset = () => ({
  type: action_types.INIT_PASSWORD_RESET,
});

export const passwordResetOutcome = () => ({
  type: action_types.PASSWORD_RESET_OUTCOME,
});
