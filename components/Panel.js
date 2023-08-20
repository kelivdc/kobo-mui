import { Box } from "@mui/material";
import React from "react";

function Panel({ children }) {
  return (
    <>
      <Box
        sx={{
          border: "solid 1px #fff",
          backgroundColor: "white",
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default Panel;
