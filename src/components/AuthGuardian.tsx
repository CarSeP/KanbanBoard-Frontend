import { Navigate } from "react-router-dom";

function AuthGuardian({ children }: { children: React.ReactNode }) {
  const path = window.location.pathname;
  const hasAuthToken = document.cookie.includes("auth_token");
  if (!hasAuthToken && path !== "/auth") {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default AuthGuardian;
