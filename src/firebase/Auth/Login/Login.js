import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthValue } from "../../../context/AuthContext";
import { Button, Input, Heading } from "@chakra-ui/react";
import { GoogleAuthProvider } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // added state for loading
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const loginWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="center">
      <div className="auth">
        <Heading as={"h1"} marginBottom={"10px"}>
          Login
        </Heading>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <Input
            variant="flushed"
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            variant="flushed"
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            colorScheme="blue"
            loadingText="Sign you in"
            isLoading={isLoading}
          >
            {isLoading ? "Loading" : "Login"}{" "}
            {/* show "Loading" or "Login" depending on isLoading state */}
          </Button>
          <Button
            colorScheme="red"
            onClick={loginWithGoogle}
            isLoading={isLoading}
          >
            Login with Google
          </Button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="link">
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
