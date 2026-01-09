import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import Browse from "./Components/Browse";
import Upload from "./Components/Upload";
import Admin from "./Components/Admin";
import Landing from "./Components/Landing";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import { EmailAuthProvider, linkWithCredential } from "firebase/auth";
import { auth } from "./firebase";

const addPasswordToCurrentUser = async (email, password) => {
  // user must already be signed in with Google
  const user = auth.currentUser;

  const credential = EmailAuthProvider.credential(email, password);
  await linkWithCredential(user, credential); // now same account can use email+password too
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* PROTECTED (ANY LOGGED-IN USER) */}
          <Route
            path="/browse"
            element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />

          {/* PROTECTED (ADMIN ONLY) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
