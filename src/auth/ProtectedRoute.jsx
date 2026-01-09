import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Stack,
  Paper
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function ProtectedRoute({
  children,
  requiredRole = null
}) {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #020617, #020617 40%, #0f172a)"
        }}
      >
        <CircularProgress size={50} sx={{ color: "#38bdf8" }} />
      </Box>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access denied
  if (requiredRole && role !== requiredRole) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #020617, #020617 40%, #0f172a)",
          px: 2
        }}
      >
        <Paper
          elevation={12}
          sx={{
            maxWidth: 480,
            width: "100%",
            p: 4,
            textAlign: "center",
            bgcolor: "rgba(15,23,42,0.92)",
            backdropFilter: "blur(12px)",
            borderRadius: 4,
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
          }}
        >
          <AdminPanelSettingsIcon
            sx={{ fontSize: 60, color: "#38bdf8", mb: 1 }}
          />

          <Typography
            variant="h4"
            fontWeight="800"
            color="#e5e7eb"
            gutterBottom
          >
            Access Restricted
          </Typography>

          <Typography
            sx={{ color: "#94a3b8", mb: 3 }}
          >
            You are logged in as a regular user.
            <br />
            Only admins are allowed to access the Admin Panel
            and approve submitted resources.
          </Typography>

          <Stack spacing={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<MenuBookIcon />}
              sx={{
                bgcolor: "#38bdf8",
                color: "#020617",
                fontWeight: 700,
                "&:hover": { bgcolor: "#0ea5e9" }
              }}
              onClick={() => navigate("/browse")}
            >
              Go to Browse Resources
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<HomeIcon />}
              sx={{
                borderColor: "#38bdf8",
                color: "#38bdf8",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "rgba(56,189,248,0.1)"
                }
              }}
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return children;
}
