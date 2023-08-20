"use client";
import Cms from "@/components/Cms";
import Panel from "@/components/Panel";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Assets() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Cms title="Assets">
      <Panel>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Table" {...a11yProps(0)} />
            <Tab label="Reports" {...a11yProps(1)} />
            <Tab label="Gallery" {...a11yProps(2)} />
            <Tab label="Map" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Table
        </TabPanel>
        <TabPanel value={value} index={1}>
          Reports
        </TabPanel>
        <TabPanel value={value} index={2}>
          Gallery
        </TabPanel>
        <TabPanel value={value} index={3}>
          Map
        </TabPanel>
      </Panel>
    </Cms>
  );
}

export default Assets;
