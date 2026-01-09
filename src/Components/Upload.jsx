import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Stack,
  Divider,
  AppBar,
  Toolbar
} from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.png";

export default function Upload() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  const handleSubmit = async () => {
    const finalSubject =
      subject === "Other" ? customSubject.trim() : subject;

    if (!title || !semester || !finalSubject || !type || !driveLink) {
      alert("Please fill all required fields!");
      return;
    }

    if (!user) {
      alert("User not authenticated");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "resources"), {
        title,
        subject: finalSubject,
        semester: Number(semester),
        type,
        year: year || "",
        description,
        driveLink,
        approved: false,
        uploaderName: user.displayName || "Unknown",
        uploaderEmail: user.email,
        uploaderUid: user.uid,
        createdAt: serverTimestamp()
      });

      alert("Resource submitted! Waiting for admin approval.");

      setTitle("");
      setSemester("");
      setSubject("");
      setCustomSubject("");
      setType("");
      setYear("");
      setDescription("");
      setDriveLink("");
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#0f172a" }} elevation={1}>
        <Toolbar>
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

          <Box sx={{ flexGrow: 1 }} />

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/browse")}>
            Browse
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          px: { xs: 2, md: 6 },
          py: 4,
          background:
            "linear-gradient(135deg, #020617, #020617 40%, #0f172a)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 1100,
            minHeight: "85vh",
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
          }}
        >
          <Typography
            variant="h4"
            fontWeight="800"
            textAlign="center"
            color="#07244dff"
          >
            Upload Academic Resource
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={3}>
            <TextField
              label="Resource Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Semester *</InputLabel>
              <Select
                value={semester}
                label="Semester *"
                onChange={(e) => setSemester(e.target.value)}
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    Semester {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Subject *</InputLabel>
              <Select
                value={subject}
                label="Subject *"
                onChange={(e) => setSubject(e.target.value)}
              >
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="Software Engineering">Software Engineering</MenuItem>
                <MenuItem value="Data Engineering">Data Engineering</MenuItem>
                <MenuItem value="Computer Networks">Computer Networks</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            {subject === "Other" && (
              <TextField
                label="Enter Subject Name *"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                fullWidth
              />
            )}

            <FormControl fullWidth>
              <InputLabel>Type *</InputLabel>
              <Select
                value={type}
                label="Type *"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Notes">Notes</MenuItem>
                <MenuItem value="PYQ">PYQ</MenuItem>
                <MenuItem value="Link">Link</MenuItem>
              </Select>
            </FormControl>

            {type === "PYQ" && (
              <TextField
                label="Year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                fullWidth
              />
            )}

            <TextField
              label="Google Drive Link *"
              type="url"
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              fullWidth
            />

            <TextField
              label="Description (optional)"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleSubmit}
              sx={{
                mt: 2,
                py: 1.4,
                fontWeight: 700,
                bgcolor: "#07244dff",
                color: "#d5d6deff",
                "&:hover": { bgcolor: "#111e94ff" }
              }}
            >
              {loading ? "Submitting..." : "Submit Resource"}
            </Button>
          </Stack>
        </Card>
      </Box>
    </>
  );
}
