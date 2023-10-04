"use client";
import Cms from "@/components/Cms";
import Panel from "@/components/Panel";
import SelectField from "@/components/SelectField";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <Cms title="Dashboard">
      <Panel>
        <Box padding={2}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography>Filter</Typography>
              <Button
                sx={{
                  marginTop: "10px",
                }}
                size="small"
                variant="contained"
                onClick={handleClickOpen}
              >
                Add filter
              </Button>
            </Grid>
            <Grid item xs={9}>
              Kanan
            </Grid>
          </Grid>
          <SelectField        
        open={open}
        onClose={handleClose}
      />
        </Box>
      </Panel>
    </Cms>
  );
}

export default Dashboard;
