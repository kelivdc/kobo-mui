import { Paper } from '@mui/material'
import React from 'react'
import Sidebar from "@/components/Sidebar";


export default function Cms({children, title}) {
  return (
    <Paper
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: 'url("/dunes.jpeg")',
          backgroundRepeat: "repeat",
          margin: "0",
          position: 'relative'
        }}
      >
      <Sidebar title={title}>
      {children}
      </Sidebar>
    </Paper>
  )
}
