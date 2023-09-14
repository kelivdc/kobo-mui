import { Box, Container } from "@mui/material";
import React from "react";

function Panel({ children }) {
  return (
    <>
      <Container      
        sx={{
          border: "solid 1px #fff",
          backgroundColor: "white",
          position: "relative",
          overflowX: "auto"
        }}
      >
        {children}
      </Container>
    </>
  );
}

export default Panel;
