"use client";
import AssetTable from "@/components/AssetTable";
import Cms from "@/components/Cms";
import Panel from "@/components/Panel";
import { TabList, TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}


function AssetsDetail({params}) {
  const [value, setValue] = useState("assets");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Cms title="Assets">
      <Panel>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Assets" value="assets" />
                <Tab label="Reports" value="reports" />
                <Tab label="Gallery" value="gallery" />
                <Tab label="Map" value="map" />
              </TabList>
            </Box>
            <TabPanel value="assets">
              <AssetTable params={params} />
            </TabPanel>
            <TabPanel value="reports">Reports</TabPanel>
            <TabPanel value="gallery">Gallery</TabPanel>
            <TabPanel value="map">Map</TabPanel>
          </TabContext>
        </Box>
      </Panel>
    </Cms>
  );
}

export default AssetsDetail;
