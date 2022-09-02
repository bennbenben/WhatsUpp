export const initialState = {
  // initial state - user not logged on
  user: null,
};

export const actionTypes = {
  // action - to push info to data layer
  // when we sign in - SET_USER
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        // keep everything, but change user value
        ...state,
        user: action.user,
      };

    default:
      // return default null
      return state;
  }
};

export default reducer;
