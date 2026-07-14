import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role) {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }

    if (!user || user.role !== role) {
      return (
        <Navigate
          to={user?.role === "admin" ? "/admin-dashboard" : "/student-dashboard"}
        />
      );
    }
  }

  return children;
};

export default ProtectedRoute;
