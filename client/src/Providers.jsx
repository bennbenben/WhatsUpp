// Import libraries
import { useReducer } from "react";

// Import internal components
import GlobalLoader from "./common/GlobalLoader";
import { initialState, Store } from "./data/Store";
import { reducerFunction } from "./data/Reducers";
import App from "./App";

const Providers = () => {
  const [globalState, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <Store.Provider value={[globalState, dispatch]}>
      <GlobalLoader />
      <App />
    </Store.Provider>
  );
};

export default Providers;
