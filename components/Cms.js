import { Paper } from '@mui/material'
import React from 'react'
import Sidebar from "@/components/Sidebar";


export default function Cms({children, title}) {
  return (
    <Paper
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: 'url("/dunes.jpeg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          margin: "0"
        }}
      >
      <Sidebar title={title}>
      {children}
      </Sidebar>
    </Paper>
  )
}
