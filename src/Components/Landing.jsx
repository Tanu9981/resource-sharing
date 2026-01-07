import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.png";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleProtectedNav = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Box sx={{ fontFamily: "Poppins, sans-serif", bgcolor: "#f8fafc" }}>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: "#0f172a" }}>
        <Toolbar>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={logo}
              alt="ResourceHub Logo"
              sx={{ width: 90, height: 90, mr: 1.5 }}
            />
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{ color: "#38bdf8", letterSpacing: "0.5px" }}
            >
              ResourceHub
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={3}>
            {!user ? (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}

            <Button color="inherit" onClick={() => handleProtectedNav("/browse")}>
              Browse
            </Button>
            <Button color="inherit" onClick={() => handleProtectedNav("/upload")}>
              Upload
            </Button>
            <Button color="inherit" onClick={() => handleProtectedNav("/admin")}>
              Admin
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "80vh",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(15,23,42,0.85)" }} />

        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h3" fontWeight="800" color="#f8fafc" gutterBottom>
            Academic Resource Sharing Platform
          </Typography>

          <Typography variant="h6" sx={{ color: "#cbd5f5", maxWidth: 720, mb: 4 }}>
            A centralized platform where seniors upload verified notes and juniors
            access semester-wise study resources effortlessly.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#38bdf8",
                color: "#0f172a",
                px: 4,
                fontWeight: 600,
                "&:hover": { bgcolor: "#0ea5e9" }
              }}
              onClick={() => handleProtectedNav("/browse")}
            >
              Browse Resources
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{ borderColor: "#cbd5f5", color: "#cbd5f5", px: 4 }}
              onClick={() => handleProtectedNav("/upload")}
            >
              Upload Notes
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 8, maxWidth: "lg" }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: <MenuBookIcon sx={{ fontSize: 42, color: "#0ea5e9" }} />,
              title: "Organized Resources",
              desc: "Notes, PYQs and links arranged by semester and subject."
            },
            {
              icon: <CloudUploadIcon sx={{ fontSize: 42, color: "#0284c7" }} />,
              title: "Easy Upload",
              desc: "Seniors can upload Google Drive links in seconds."
            },
            {
              icon: <VerifiedIcon sx={{ fontSize: 42, color: "#0369a1" }} />,
              title: "Admin Verified",
              desc: "All resources are approved by admins before publishing."
            }
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  textAlign: "center",
                  transition: "all 0.35s ease",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(2, 0, 36, 0.18)"
                  }
                }}
              >
                <CardContent sx={{ py: 5 }}>
                  {item.icon}
                  <Typography variant="h6" fontWeight="700" mt={2}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "#020617", color: "#cbd5f5", py: 4 }}>
        <Container>
          <Typography textAlign="center" fontWeight="700" color="#38bdf8">
            ResourceHub
          </Typography>
          <Typography textAlign="center" variant="body2" color="#94a3b8" mt={1}>
            A college-level academic resource sharing system
          </Typography>
          <Divider sx={{ my: 2, borderColor: "#1e293b" }} />
          <Typography textAlign="center" variant="caption" color="#64748b">
            © {new Date().getFullYear()} ResourceHub
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
