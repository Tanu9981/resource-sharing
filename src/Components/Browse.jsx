import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Divider
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

const dummyResources = [
  { id: 1, title: "Python Basics Notes", subject: "Python", semester: "1", type: "Notes", year: 2024, uploader: "Rahul", downloads: 1450 },
  { id: 2, title: "Java Advanced PYQ", subject: "Java", semester: "2", type: "PYQ", year: 2023, uploader: "Priya", downloads: 2340 },
  { id: 3, title: "Excel Advanced Notes", subject: "Advanced Excel", semester: "3", type: "Notes", year: 2024, uploader: "Amit", downloads: 980 },
  { id: 4, title: "Python OOP Explained", subject: "Python", semester: "4", type: "Notes", year: 2023, uploader: "Shiv", downloads: 1500 },
  { id: 5, title: "Java Spring Boot Overview", subject: "Java", semester: "5", type: "Link", year: 2024, uploader: "Ankit", downloads: 1100 },
  { id: 6, title: "Excel Dashboard Tutorial", subject: "Advanced Excel", semester: "6", type: "Link", year: 2024, uploader: "Neha", downloads: 430 },
  { id: 7, title: "Python Web Dev Notes", subject: "Python", semester: "7", type: "Notes", year: 2023, uploader: "Vikas", downloads: 1550 },
  { id: 8, title: "Java Best Practices", subject: "Java", semester: "8", type: "Notes", year: 2024, uploader: "Ritu", downloads: 298 },
  { id: 9, title: "Excel Formulas Cheatsheet", subject: "Advanced Excel", semester: "9", type: "PYQ", year: 2023, uploader: "Deepak", downloads: 640 }
];

export default function Browse() {
  const navigate = useNavigate();
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = dummyResources.filter((resource) => {
    const matchesSemester = semester ? resource.semester === semester : true;
    const matchesSubject = subject ? resource.subject === subject : true;
    const matchesType = type ? resource.type === type : true;
    const matchesSearch = searchQuery
      ? resource.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesSemester && matchesSubject && matchesType && matchesSearch;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* ------ TITLE ------ */}
      <Typography variant="h4" fontWeight="700" color="primary" textAlign="center">
        Browse Resources
      </Typography>

      <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
        Search and filter study resources shared by seniors
      </Typography>

      {/* ------ FILTER BAR ------ */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: { xs: "100%", md: 350 } }}
        />

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Semester</InputLabel>
          <Select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            label="Semester"
          >
            <MenuItem value="">All</MenuItem>
            {[...Array(10).keys()].map((i) => (
              <MenuItem key={i + 1} value={`${i + 1}`}>Sem {i + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            label="Subject"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="Advanced Excel">Advanced Excel</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Resource Type"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Notes">Notes</MenuItem>
            <MenuItem value="PYQ">PYQ</MenuItem>
            <MenuItem value="Link">Link</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Divider />

      {/* ------ RESOURCE CARDS GRID ------ */}
      <Grid container spacing={4} sx={{ mt: 2 }} justifyContent="center">
        {filteredResources.length === 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            width="100%"
            mt={4}
          >
            No resources found.
          </Typography>
        )}

        {filteredResources.map((res) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={res.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              elevation={3}
              sx={{
                maxWidth: 420,
                width: "100%",
                borderRadius: 3,
                "&:hover": {
                  boxShadow: "0 8px 28px rgba(0,0,0,0.18)"
                }
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={res.type}
                    color={
                      res.type === "Notes"
                        ? "primary"
                        : res.type === "PYQ"
                        ? "warning"
                        : "success"
                    }
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {res.year}
                  </Typography>
                </Stack>

                <Typography variant="h6" fontWeight="600" mt={1}>
                  {res.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {res.subject} • Semester {res.semester}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Uploaded by {res.uploader}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                {/* Updated View button to navigate */}
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate(`/resource/${res.id}`)}
                >
                  View
                </Button>

                <Button size="small" startIcon={<DownloadIcon />}>
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
