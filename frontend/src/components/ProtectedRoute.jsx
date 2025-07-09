import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check for token expiration
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }

    // Check role
    if (role && decoded.role !== role) {
      return <Navigate to="/" />;
    }

    // Support both standalone routes and nested route outlets
    return children || <Outlet />;
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
