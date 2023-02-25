import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Text, Stack } from "@chakra-ui/react";

const Home = () => {
  return (
    <div className="center">
      <Stack>
        <Text
          fontSize={{ base: "20px", md: "25px", lg: "30px" }}
          fontWeight="bold"
          className="text"
        >
          nothingyoucansee
          <Link to="/login" className="here">
            here
          </Link>
        </Text>

        <Text textAlign="center" fontWeight="semibold">
          © 2023{" "}
          <Link
            to="https://sam.sleepingatparty.xyz"
            target="_blank"
            className="xem"
          >
            XEM
          </Link>
        </Text>
      </Stack>
    </div>
  );
};

export default Home;
