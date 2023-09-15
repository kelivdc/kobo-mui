import { Box, Container, Paper } from "@mui/material";
import React from "react";

function Panel({ children }) {
  const windowWidth = window.innerWidth - 290;
  return (
    <>
      <Box                  
        sx={{
          border: "solid 1px #fff",
          backgroundColor: "white",
          position: "relative",
          overflowX: "auto",
          maxWidth: `${windowWidth}px`
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default Panel;
