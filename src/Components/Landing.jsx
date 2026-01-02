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
  Divider,
  Link
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Box sx={{ fontFamily: "Poppins, sans-serif" }}>

      {/* ====== NAVBAR ====== */}
      <AppBar position="static" sx={{ backgroundColor: "#203040", px: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "800", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ResourceHub
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/browse")}>
              Browse
            </Button>
            <Button color="inherit" onClick={() => navigate("/upload")}>
              Upload
            </Button>
            <Button color="inherit" onClick={() => navigate("/admin")}>
              Admin
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* ====== HERO SECTION ====== */}
      <Box
        sx={{
          minHeight: "75vh",
          background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="800" gutterBottom>
            Find & Share Academic Resources Easily
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            A community-driven space where engineering students discover notes,
            PYQs, and study links to succeed together.
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/browse")}
              sx={{
                backgroundColor: "#ff7f50",
                color: "#fff",
                px: 4,
                "&:hover": { backgroundColor: "#ff6a33" }
              }}
            >
              Browse Resources
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/upload")}
              sx={{
                borderColor: "#fff",
                color: "#fff",
                px: 4,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
              }}
            >
              Upload Resource
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* ====== FEATURES SECTION ====== */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="700"
          gutterBottom
          color="text.primary"
        >
          What You Can Do
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
        >
          ResourceHub makes academic collaboration simple — organized by semester,
          subject, and type for quick access.
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: <SchoolIcon sx={{ fontSize: 50, color: "#203040" }} />,
              title: "Browse Notes",
              description:
                "Explore well-organized notes and study materials."
            },
            {
              icon: <FolderSharedIcon sx={{ fontSize: 50, color: "#ff7f50" }} />,
              title: "Share Knowledge",
              description: "Upload your own resources to help others."
            },
            {
              icon: <CloudUploadIcon sx={{ fontSize: 50, color: "#8f94fb" }} />,
              title: "Upload Easily",
              description: "Submit files or links in just a few steps."
            }
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  transition: "0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 35px rgba(0,0,0,0.15)"
                  }
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  {item.icon}
                  <Typography variant="h6" fontWeight="700" mt={2}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ====== ABOUT SECTION ====== */}
      <Box sx={{ backgroundColor: "#f7f9fc", py: 5 }}>
        <Container>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="700"
            mb={2}
          >
            About ResourceHub
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            mx="auto"
            sx={{ maxWidth: 800 }}
          >
            ResourceHub connects engineering students with academic
            resources shared by seniors — making learning easier,
            collaborative, and stress-free.
          </Typography>
        </Container>
      </Box>

      {/* ====== FOOTER ====== */}
      <Box
        sx={{
          backgroundColor: "#203040",
          color: "#fff",
          py: 6,
          px: 2
        }}
      >
        <Container>
          <Grid container spacing={4}>
            {/* Footer Section 1 */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="700" mb={1}>
                ResourceHub
              </Typography>
              <Typography variant="body2">
                A student-focused hub for academic notes, links, and PYQs.
              </Typography>
            </Grid>

            {/* Footer Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="700" mb={1}>
                Quick Links
              </Typography>

              <Stack spacing={1}>
                <Link
                  sx={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => navigate("/browse")}
                >
                  Browse
                </Link>
                <Link
                  sx={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => navigate("/upload")}
                >
                  Upload
                </Link>
                <Link
                  sx={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Link>
                <Link
                  sx={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </Link>
              </Stack>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="700" mb={1}>
                Contact Us
              </Typography>
              <Typography variant="body2">📧 support@resourcehub.com</Typography>
              <Typography variant="body2">📞 +91 91234 56789</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "#444", my: 2 }} />

          <Typography variant="body2" textAlign="center" sx={{ color: "#bbb" }}>
            © {new Date().getFullYear()} ResourceHub. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
