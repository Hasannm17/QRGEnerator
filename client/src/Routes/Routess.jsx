import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Main from "../pages/Main";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Routess = () => {
  const token = cookies.get("TOKEN");

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      {token ? (
        <Route path="/" element={<Main />} />
      ) : (
        <Route to="/signin" replace />
      )}
    </Routes>
  );
};

export default Routess;
