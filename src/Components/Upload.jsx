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
  Divider
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    if (!title || !semester || !subject || !type) {
      alert("Please fill all required fields!");
      return;
    }

    if (type !== "Link" && !file) {
      alert("Please upload a file!");
      return;
    }

    if (type === "Link" && !link) {
      alert("Please add a valid link!");
      return;
    }

    const data = {
      title,
      semester,
      subject,
      type,
      year,
      description,
      file,
      link,
    };

    console.log("Form Data:", data);
    alert("Resource submitted! (UI only)");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        p: { xs: 2, md: 4 }
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 650,
          p: 3,
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.10)"
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="700"
          gutterBottom
        >
          Upload a New Resource
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Form */}
        <Stack spacing={2}>
          {/* Title */}
          <TextField
            label="Resource Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          {/* Semester */}
          <FormControl fullWidth>
            <InputLabel>Semester *</InputLabel>
            <Select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              label="Semester *"
            >
              {[...Array(10).keys()].map((i) => (
                <MenuItem key={i + 1} value={`${i + 1}`}>
                  Semester {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Subject */}
          <FormControl fullWidth>
            <InputLabel>Subject *</InputLabel>
            <Select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              label="Subject *"
            >
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Advanced Excel">Advanced Excel</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Type */}
          <FormControl fullWidth>
            <InputLabel>Type *</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type *"
            >
              <MenuItem value="Notes">Notes</MenuItem>
              <MenuItem value="PYQ">PYQ</MenuItem>
              <MenuItem value="Link">Link</MenuItem>
            </Select>
          </FormControl>

          {/* Year – only display if PYQ */}
          {type === "PYQ" && (
            <TextField
              label="Year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
            />
          )}

          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          {/* File / Link */}
          {type === "Link" ? (
            <TextField
              label="External Link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              fullWidth
            />
          ) : (
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{ py: 1.3 }}
            >
              Upload File *
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Submit Resource
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
