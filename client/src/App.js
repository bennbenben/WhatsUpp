// Import libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import internal components
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import WhatsUpp from "./components/chat/WhatsUpp";
import "./App.css";
// delete later
import Private from "./common/Private";
import PublicRoute from "./components/routing/PublicRoute";

const App = () => {
  return (
    <div className="app">
      <div className="app__body">
        <BrowserRouter>
          <Routes>
            
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<WhatsUpp />} />
            </Route>

            {/* Public routes */}
            <Route element={<PublicRoute />} >
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/passwordreset/:resetToken" element={<ResetPassword />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;