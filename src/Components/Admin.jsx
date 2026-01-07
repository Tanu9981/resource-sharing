import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  CircularProgress,
  Chip,
  Divider,
  Avatar,
  Tooltip
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import InfoIcon from "@mui/icons-material/Info";

import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import logo from "../assets/logo.png";

export default function Admin() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPendingResources = async () => {
    try {
      const q = query(
        collection(db, "resources"),
        where("approved", "==", false)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));

      setResources(data);
    } catch (error) {
      console.error("Error fetching pending resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingResources();
  }, []);
  //  Approve
  const handleApprove = async (id) => {
    await updateDoc(doc(db, "resources", id), { approved: true });
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  //  Reject
  const handleReject = async (id) => {
    await deleteDoc(doc(db, "resources", id));
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) {
    return (
      
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #020617, #0f172a)"
        }}
      >
        <CircularProgress size={55} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 6 },
        py: 4,
        background:
          "linear-gradient(135deg, #020617, #020617 40%, #0f172a)",
        position: "relative"
      }}
    >
<AppBar
  position="sticky"
  elevation={1}
  sx={{ bgcolor: "#020617" }}
>
  <Toolbar sx={{ justifyContent: "space-between" }}>
    <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/")}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="ResourceHub Logo"
                  sx={{
                    width: 100,
                    height: 100,
                    mr: 1.5
                  }}
                />
    
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    color: "#38bdf8",
                    letterSpacing: "0.5px"
                  }}
                >
                  ResourceHub
                </Typography>
              </Box>
    <Stack direction="row" spacing={3} alignItems="center">
      <Button
                  color="inherit"
                  sx={{ }}
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
      <Button
        color="inherit"
        onClick={() => navigate("/browse")}
      >
        Browse
      </Button>

      <Button
        color="inherit"
        onClick={() => navigate("/upload")}
      >
        Upload
      </Button>
      <Button
        disabled
        sx={{
          color: "#38bdf8 !important",
          fontWeight: 700
        }}
      >
        Admin
      </Button>

      <Button
        variant="outlined"
        sx={{
          borderColor: "#38bdf8",
          color: "#38bdf8",
          "&:hover": {
            bgcolor: "rgba(56,189,248,0.1)"
          }
        }}
        onClick={async () => {
         await signOut(auth);
navigate("/login", { replace: true });

        }}
      >
        Logout
      </Button>
    </Stack>
  </Toolbar>
</AppBar>
      <Box
        sx={{
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: 320,
          height: 320,
          bgcolor: "#38bdf8",
          borderRadius: "50%",
          filter: "blur(160px)",
          opacity: 0.25
        }}
      />
      <Stack
        alignItems="center"
        spacing={1}
        mb={5}
        textAlign="center"
      >
        <PendingIcon sx={{ fontSize: 48, color: "#38bdf8" }} />
        <Typography variant="h4" fontWeight="800" color="#e5e7eb">
          Admin Moderation
        </Typography>
        <Typography color="#94a3b8">
          Review and approve submitted academic resources
        </Typography>
      </Stack>
      {resources.length === 0 ? (
        <Typography textAlign="center" color="#94a3b8" mt={6}>
          🎉 No pending resources for approval
        </Typography>
      ) : (
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          {resources.map((res) => (
            <Card
              key={res.id}
              sx={{
                mb: 3,
                borderRadius: 3,
                bgcolor: "rgba(15,23,42,0.92)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.6)"
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#38bdf8", color: "#020617" }}>
                    {res.type?.charAt(0)}
                  </Avatar>

                  <Box flexGrow={1}>
                    <Typography variant="h6" fontWeight="700" color="#e5e7eb">
                      {res.title}
                    </Typography>

                    <Typography variant="body2" color="#94a3b8">
                      {res.subject} • Semester {res.semester}
                    </Typography>

                    <Typography variant="body2" color="#64748b">
                      Uploaded by {res.uploader}
                    </Typography>
                  </Box>

                  <Chip
                    label={res.type}
                    size="small"
                    sx={{
                      bgcolor: "#1e293b",
                      color: "#e5e7eb"
                    }}
                  />
                </Stack>

                <Divider sx={{ my: 2, borderColor: "#1e293b" }} />

                <Stack direction="row" spacing={2}>
                  <Tooltip title="Approve resource">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => handleApprove(res.id)}
                    >
                      Approve
                    </Button>
                  </Tooltip>

                  <Tooltip title="Reject resource">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={() => handleReject(res.id)}
                    >
                      Reject
                    </Button>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
