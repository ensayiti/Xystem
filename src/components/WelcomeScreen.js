import React from "react";
import { Box, Typography } from "@mui/material";

const WelcomeScreen = () => {
  return (
    <Box textAlign="center" p={1}>
      <Box component="figure">
        <Box component="img" width={{ sm: 0.9 }} />
      </Box>
      <Box mt={3}>
        <Typography variant="h5">Tambahkan tugas untuk memulai</Typography>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
