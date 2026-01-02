import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Button
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate, useParams } from "react-router-dom";

// Dummy example data (later replace with real Firestore fetch)
const dummyData = [
  {
    id: "1",
    title: "Python Basics Notes",
    subject: "Python",
    semester: "1",
    type: "Notes",
    year: 2024,
    uploader: "Rahul",
    description:
      "These notes cover basic Python syntax, loops, functions, OOP basics, file handling, and examples.",
    fileUrl: "https://example.com/python_basics.pdf",
    linkUrl: ""
  },
  {
    id: "2",
    title: "Java Advanced PYQ",
    subject: "Java",
    semester: "2",
    type: "PYQ",
    year: 2023,
    uploader: "Priya",
    description:
      "Previous year questions for Java Advanced topics including generics, multithreading, collections and streams.",
    fileUrl: "",
    linkUrl: "https://example.com/java_pyq_link"
  }
];

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // find the resource by id (dummy for now)
  const resource = dummyData.find((r) => r.id === id) || dummyData[0];

  const handleDownload = () => {
    // Increment download count (later Firestore logic)
    window.open(resource.fileUrl || resource.linkUrl, "_blank");
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/browse")}
      >
        Back to Browse
      </Button>

      <Card sx={{ mt: 2, p: 2, borderRadius: 3, maxWidth: 800, mx: "auto" }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={resource.type}
              color={
                resource.type === "Notes"
                  ? "primary"
                  : resource.type === "PYQ"
                  ? "warning"
                  : "success"
              }
              size="small"
            />
            <Typography variant="caption" color="text.secondary">
              {resource.year}
            </Typography>
          </Stack>

          <Typography variant="h4" fontWeight="700" mt={1} mb={1}>
            {resource.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {resource.subject} • Semester {resource.semester}
          </Typography>

          <Typography variant="body1" mb={2}>
            {resource.description}
          </Typography>

          {/* View/Preview area (if fileUrl) */}
          {resource.fileUrl && (
            <Box
              component="iframe"
              src={resource.fileUrl}
              width="100%"
              height="450px"
              sx={{ border: "1px solid #ccc", borderRadius: 2, mb: 2 }}
            />
          )}

          {/* Action Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={handleDownload}
            >
              View / Download
            </Button>

            {/* Download button only if link exists */}
            {!resource.fileUrl && resource.linkUrl && (
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
              >
                Open Link
              </Button>
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary" mt={3}>
            Uploaded by {resource.uploader}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
