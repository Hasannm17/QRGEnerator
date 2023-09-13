import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ProtectedRoute({ element: Element, ...rest }) {
  const token = cookies.get("TOKEN");

  return (
    <Route
      {...rest}
      element={token ? <Element /> : <Navigate to="/signin" replace />}
    />
  );
}
