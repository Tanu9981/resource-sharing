import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function ProtectedRoute({
  children,
  requiredRole = null
}) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2
        }}
      >
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Access Denied
        </Typography>
        <Typography color="text.secondary">
          You are logged in as a user.  
          Only admins can approve resources.
        </Typography>
      </Box>
    );
  }

  return children;
}
