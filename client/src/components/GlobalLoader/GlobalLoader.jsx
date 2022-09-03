// Import external dependencies
import { useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

// Import internal dependencies
import { Store } from "../../data/Store";
import { testAction } from "../../data/Actions";

const GlobalLoader = () => {
  const [globalState, dispatch] = useContext(Store);
  const { isLoading } = globalState;

  const handleClose = () => {
    dispatch(testAction());
  };

  if (isLoading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  return null;
};

export default GlobalLoader;
