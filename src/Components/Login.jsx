import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  AppBar,
  Toolbar,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // false = login, true = signup

  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoadingEmail(true);
      const result = await signInWithEmailAndPassword(auth, email, password); // [web:2]
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: "",
          photoURL: "",
          createdAt: new Date(),
        });
      }

      navigate("/browse");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoadingEmail(false);
    }
  };

  // email/password sign-up (logic only, no layout change)
  const handleEmailSignUp = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoadingEmail(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); // [web:2]
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: "",
        photoURL: "",
        createdAt: new Date(),
      });

      navigate("/browse");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Try signing in instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      setError("");

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });
      }

      navigate("/browse");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed");
    } finally {
      setLoadingGoogle(false);
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
              alt="logo"
              sx={{ width: 90, mr: 1 }}
            />
            <Typography variant="h5" fontWeight="800" color="#38bdf8">
              ResourceHub
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {/* LEFT */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#020617,#0f172a)",
          }}
        >
          <Typography variant="h3" color="#38bdf8" fontWeight="800">
            ResourceHub
          </Typography>
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#020617",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 420,
              p: 4,
              bgcolor: "rgba(15,23,42,0.9)",
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" color="#38bdf8" fontWeight="800" mb={2}>
              User Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              margin="normal"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#38bdf8" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "#e2e8f0" },
                "& .MuiOutlinedInput-root": { bgcolor: "#020617" },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#38bdf8" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: "#94a3b8" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "#e2e8f0" },
                "& .MuiOutlinedInput-root": { bgcolor: "#020617" },
              }}
            />

            {/* SAME BUTTON, but it now does login or signup based on isSignUp */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                py: 1.4,
                fontWeight: 700,
                bgcolor: "#38bdf8",
                color: "#020617",
                "&:hover": { bgcolor: "#0ea5e9" },
              }}
              onClick={isSignUp ? handleEmailSignUp : handleEmailLogin}
              disabled={loadingEmail}
            >
              {loadingEmail
                ? isSignUp
                  ? "Creating account..."
                  : "Signing in..."
                : isSignUp
                ? "Sign Up"
                : "Sign In"}
            </Button>

            <Divider sx={{ my: 3, borderColor: "#1e293b" }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              sx={{
                py: 1.3,
                fontWeight: 700,
                borderColor: "#38bdf8",
                color: "#38bdf8",
                "&:hover": {
                  bgcolor: "rgba(56,189,248,0.1)",
                },
              }}
            >
              {loadingGoogle ? "Signing in..." : "Continue with Google"}
            </Button>

            {/* Small text toggle to switch between login and signup; layout is same box */}
            <Typography
              variant="body2"
              sx={{ mt: 2, color: "#cbd5f5", textAlign: "center" }}
            >
              {isSignUp
                ? "Already have an account? "
                : "Don’t have an account? "}
              <span
                style={{
                  color: "#38bdf8",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => {
                  setError("");
                  setIsSignUp(!isSignUp);
                }}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
