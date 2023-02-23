import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./firebase/Auth/Profile/Profile";
import Register from "./firebase/Auth/Register/Register";
import VerifyEmail from "./firebase/Auth/VerifyEmail/VerifyEmail";
import Login from "./firebase/Auth/Login/Login";
import Home from "./firebase/Auth/Home/Home";
import { useState, useEffect } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./router/PrivateRoute";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Container } from "@mui/material";
import { containerStyle } from "./theme/customStyles";
import ToDo from "./pages/ToDo";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    !loading && (
      <ChakraProvider>
        <Router>
          <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                exact
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  !currentUser?.emailVerified ? (
                    <Login />
                  ) : (
                    <Navigate to="/profile" replace />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  !currentUser?.emailVerified ? (
                    <Register />
                  ) : (
                    <Navigate to="/profile" replace />
                  )
                }
              />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route
                path="/xnotes"
                element={
                  <Container sx={containerStyle}>
                    <ToDo />
                  </Container>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </ChakraProvider>
    )
  );
}

export default App;
