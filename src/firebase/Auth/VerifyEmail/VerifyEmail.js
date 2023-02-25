import "./VerifyEmail.css";
import { useAuthValue } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function VerifyEmail() {
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(60);
  const { timeActive, setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate("/");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="center">
      <div className="verifyEmail">
        <p>
          <strong>Verification email has been sent to:</strong>
          <br />
          <span>{currentUser?.email}</span>
        </p>
        <Button
          marginTop={"20px"}
          colorScheme="red"
          onClick={resendEmailVerification}
          disabled={timeActive}
        >
          Resend Email {timeActive && time}
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmail;
