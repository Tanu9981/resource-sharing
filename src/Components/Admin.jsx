import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import { auth, db } from "../firebase";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.png";

export default function Admin() {
  const navigate = useNavigate();
  const { user, role, loading: authLoading } = useAuth();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!authLoading && role !== "admin") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#020617"
        }}
      >
        <Typography variant="h5" color="#94a3b8">
          🚫 Access Denied — Admins only
        </Typography>
      </Box>
    );
  }

  const fetchPendingResources = async () => {
    const q = query(
      collection(db, "resources"),
      where("approved", "==", false)
    );
    const snapshot = await getDocs(q);
    setResources(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    if (role === "admin") {
      fetchPendingResources();
    }
  }, [role]);

  const handleApprove = async (id) => {
    await updateDoc(doc(db, "resources", id), {
      approved: true,
      approvedBy: user.email
    });
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const handleReject = async (id) => {
    await deleteDoc(doc(db, "resources", id));
    setResources(prev => prev.filter(r => r.id !== id));
  };

  if (loading || authLoading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#020617", p: 4 }}>
      <AppBar position="sticky" sx={{ bgcolor: "#020617" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" src={logo} sx={{ width: 80, mr: 1 }} />
            <Typography color="#38bdf8" fontWeight={800}>
              ResourceHub
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{ color: "#38bdf8", borderColor: "#38bdf8" }}
            onClick={async () => {
              await signOut(auth);
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Stack alignItems="center" mt={5} mb={4}>
        <PendingIcon sx={{ fontSize: 50, color: "#38bdf8" }} />
        <Typography variant="h4" color="#e5e7eb" fontWeight={800}>
          Admin Moderation
        </Typography>
      </Stack>

      {resources.length === 0 ? (
        <Typography textAlign="center" color="#94a3b8">
          🎉 No pending approvals
        </Typography>
      ) : (
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          {resources.map(res => (
            <Card key={res.id} sx={{ mb: 3, bgcolor: "#0f172a" }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar>{res.type?.[0]}</Avatar>
                  <Box flexGrow={1}>
                    <Typography color="#e5e7eb" fontWeight={700}>
                      {res.title}
                    </Typography>
                    <Typography color="#94a3b8" fontSize={14}>
                      Uploaded by {res.uploader}
                    </Typography>
                  </Box>
                  <Chip label={res.type} />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" spacing={2}>
                  <Tooltip title="Approve">
                    <Button
                      color="success"
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => handleApprove(res.id)}
                    >
                      Approve
                    </Button>
                  </Tooltip>

                  <Tooltip title="Reject">
                    <Button
                      color="error"
                      variant="outlined"
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
