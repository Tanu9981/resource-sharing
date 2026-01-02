import React from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

export default function UploadSuccess() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        backgroundColor: "#f4f6fb"
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: "#4caf50", mb: 2 }}
        />

        <Typography variant="h4" fontWeight="700" gutterBottom>
          Resource Uploaded!
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          mb={3}
        >
          Your resource has been successfully submitted and will be visible
          to others once approved by an admin.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/browse")}
          sx={{ mr: 2 }}
        >
          Go to Browse
        </Button>
z
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/upload")}
        >
          Upload Another
        </Button>
      </Card>
    </Box>
  );
}
