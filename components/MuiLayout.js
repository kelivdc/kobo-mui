"use client";
import "@/app/globals.css";

import {
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

export default function MuiLayout({ children }) {
  const theme = createTheme({
    typography: {
      fontFamily: ["Roboto", "Arial"].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: 'url("/dunes.jpeg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "0"
        }}
      >
        {children}
      </Paper>
    </ThemeProvider>
  );
}
