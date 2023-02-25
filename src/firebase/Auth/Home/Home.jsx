import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="center">
      <Stack>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>
      </Stack>
    </div>
  );
};

export default Home;
