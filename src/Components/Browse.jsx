import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  TextField,
  Divider,
  AppBar,
  Toolbar
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

import { collection, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import logo from "../assets/logo.png";

export default function Browse() {
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [course] = useState("mtech_ai_ds");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const q = query(
        collection(db, "resources"),
        where("approved", "==", true)
      );
      const snapshot = await getDocs(q);
      setResources(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };

    fetchResources();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  const uniqueSubjects = [
    ...new Set(resources.map(r => r.subject).filter(Boolean))
  ];

  const filteredResources = resources.filter(r =>
    (!semester || String(r.semester) === semester) &&
    (!subject || r.subject === subject) &&
    (!type || r.type === type) &&
    (!searchQuery ||
      r.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a 0%, #020617 60%)",
        color: "#fff"
      }}
    >
      <AppBar position="sticky" sx={{ bgcolor: "#020617" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={logo}
              alt="ResourceHub Logo"
              sx={{ width: 100, height: 100, mr: 1.5 }}
            />
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{ color: "#38bdf8", letterSpacing: "0.5px" }}
            >
              ResourceHub
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/upload")}>
              Upload
            </Button>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" fontWeight={700}>
          Browse Resources
        </Typography>
        <Typography sx={{ color: "#cbd5f5", mt: 1 }}>
          Semester-wise academic resources shared by students
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 420, mx: "auto", mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#fff" }}>Course</InputLabel>
          <Select value={course} sx={{ color: "#fff" }}>
            <MenuItem value="mtech_ai_ds">
              Integrated M.Tech (AI & DS – 5 Year)
            </MenuItem>
            <MenuItem disabled>
              <LockIcon sx={{ fontSize: 16, mr: 1 }} /> MBA — Coming Soon
            </MenuItem>
            <MenuItem disabled>
              <LockIcon sx={{ fontSize: 16, mr: 1 }} /> BDA — Coming Soon
            </MenuItem>
            <MenuItem disabled>
              <LockIcon sx={{ fontSize: 16, mr: 1 }} /> MTech-2year — Coming Soon
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        mb={3}
        sx={{
          px: 2,
          "& .MuiInputBase-root": {
            bgcolor: "#ffffff",
            borderRadius: 2
          }
        }}
      >
        <TextField
          label="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 240 }}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Semester</InputLabel>
          <Select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i} value={`${i + 1}`}>
                Semester {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Subject</InputLabel>
          <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {uniqueSubjects.map(sub => (
              <MenuItem key={sub} value={sub}>
                {sub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Notes">Notes</MenuItem>
            <MenuItem value="PYQ">PYQ</MenuItem>
            <MenuItem value="Link">Link</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Divider sx={{ borderColor: "#1e293b", mb: 4 }} />

      <Grid container spacing={4} px={{ xs: 2, md: 6 }} pb={6}>
        {loading && (
          <Typography textAlign="center" width="100%">
            Loading...
          </Typography>
        )}

        {filteredResources.map(res => (
          <Grid item xs={12} sm={6} md={4} key={res.id}>
            <Card
              sx={{
                background:
                  "linear-gradient(180deg, #020617 0%, #020617 100%)",
                borderRadius: 3,
                height: "100%",
                transition: "0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 0 25px rgba(56,189,248,0.35)"
                }
              }}
            >
              <CardContent>
                <Chip label={res.type} color="primary" size="small" />

                <Typography variant="h6" mt={1} color="#ffffff">
                  {res.title}
                </Typography>

                <Typography sx={{ color: "#e5e7eb", fontSize: 14 }}>
                  {res.subject} • Semester {res.semester}
                </Typography>

                <Typography sx={{ color: "#cbd5f5", fontSize: 13, mt: 0.5 }}>
                  Uploaded by {res.uploaderName || "User"}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                {res.driveLink && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{
                      fontWeight: 600,
                      bgcolor: "#1d4ed8",
                      "&:hover": { bgcolor: "#2563eb" }
                    }}
                    onClick={() => window.open(res.driveLink, "_blank")}
                  >
                    OPEN RESOURCE
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
