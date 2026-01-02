import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  InputAdornment,
  IconButton
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [role, setRole] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Card
        sx={{
          width: 380,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          ResourceHub
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={2}
        >
          Sign in to access your resource sharing platform
        </Typography>

        {/* Role Tabs */}
        <Tabs
          value={role}
          onChange={(e, newValue) => setRole(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Junior" />
          <Tab label="Senior" />
          <Tab label="Admin" />
        </Tabs>

        {/* Email */}
        <TextField
          fullWidth
          placeholder="your.email@college.edu"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
              </InputAdornment>
            )
          }}
        />

        {/* Password */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: 2,
            backgroundColor: "#6c7cff"
          }}
        >
          Sign In
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          mt={2}
          color="text.secondary"
        >
          Don&apos;t have an account?{" "}
          <span style={{ color: "#6c7cff", cursor: "pointer" }}>
            Sign up
          </span>
        </Typography>
      </Card>
    </Box>
  );
}
