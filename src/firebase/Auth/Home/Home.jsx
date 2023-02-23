import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <div className="center">
      <Text fontSize="2xl" fontWeight="bold">
        Nothing you can see <Link to="/login">here</Link>
      </Text>
    </div>
  );
};

export default Home;
