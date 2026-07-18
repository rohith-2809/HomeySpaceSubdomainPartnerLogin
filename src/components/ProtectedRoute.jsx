import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Guards authenticated areas. While the initial auth hydrate is running we
// render nothing (avoids a flash/redirect); then redirect to login if no token.
export default function ProtectedRoute({ children }) {
  const { isAuthed, loading } = useAuth();
  if (loading) return null;
  if (!isAuthed) return <Navigate to="/" replace />;
  return children;
}
