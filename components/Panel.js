import { Box, Container, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

function Panel({ children }) {
  const [maxWidth, setMaxWidth] = useState(null)
  useEffect(() => {
    setMaxWidth(window.innerWidth - 300)
  },[])
  
  return (
    <>
      <Box                  
        sx={{
          border: "solid 1px #fff",
          backgroundColor: "white",
          position: "relative",
          overflowX: "auto",
          maxWidth: `${maxWidth}px`,
          minHeight: "80vh",
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default Panel;
