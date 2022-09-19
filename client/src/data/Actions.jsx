const action_types = {
  SET_LOADING_FALSE: "SET_LOADING_FALSE",
  SET_LOADING_TRUE: "SET_LOADING_TRUE",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGOUT: "USER_LOGOUT",
  SET_CHATROOM_ID: "SET_CHATROOM_ID",
  TOGGLE_UPDATE_SENDER_CHATROOM: "TOGGLE_UPDATE_SENDER_CHATROOM",
};

export const setLoadingFalse = () => ({
  type: action_types.SET_LOADING_FALSE,
});

export const setLoadingTrue = () => ({
  type: action_types.SET_LOADING_TRUE,
});

export const userLoginSuccess = (currentUser) => ({
  type: action_types.USER_LOGIN_SUCCESS,
  payload: {
    userId: currentUser.userId,
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    bio: currentUser.bio,
  },
});

export const userLogout = () => ({
  type: action_types.USER_LOGOUT,
});

export const setChatroomId = (chatroomId) => ({
  type: action_types.SET_CHATROOM_ID,
  payload: { chatroomId: chatroomId },
});

export const toggleUpdateSenderChatroom = () => ({
  type: action_types.TOGGLE_UPDATE_SENDER_CHATROOM,
});
