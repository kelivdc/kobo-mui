"use client";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

const api_url = process.env.server;

function AssetTable({ params }) {
  const { data: session } = useSession();
  const [survey, setSurvey] = useState([]);
  const [keys, setKeys] = useState([]);
  const [columns, setColumns] = useState([]);
  const [choices, setChoices] = useState([]);
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(30)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 15,
  });
  
  async function getSurvey() {
    try {
      const resp = await fetch(api_url + "/assets/form/" + params.uid, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      });
      const data = await resp.json();
      setSurvey(data["Content"]["survey"]);
      const values = data["Content"]["survey"].map((item) => ({
        name: item["label"][0],
        selector: item["name"],
        sortable: true,
      }));
      setKeys(values);
      setChoices(data["Content"]["choices"]);
      const col_head = data["Content"]["survey"].map((item) => ({
        field: item["name"],
        headerName: item["label"][0],
      }));
      setColumns(col_head);
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function getData() {
    try {
      const resp = await fetch(api_url + "/assets/data/" + params.uid, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      });
      const data = await resp.json();
      setRows(data);
    } catch (err) {
      console.log("Error", err);
    }
  }
  useEffect(() => {
    var arrResult = [];
    if (session) {
     
      getSurvey();
      getData();
    }
  }, [session]);
  const getCustomId = (row) => row["_id"];
  
  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={getCustomId}
        pageSize={pageSize}
        pageSizeOptions={[10,30,50,100]}
        rowHeight={25}
        columnHeaderHeight={35}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "#f0f0f0",
          },
        }}
      ></DataGrid>
    </>
  );
}

export default AssetTable;
