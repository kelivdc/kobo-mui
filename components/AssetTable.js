import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const api_url = process.env.server;

function columnFormat(values) {
  let value = values["value"];
  if (moment(value, moment.ISO_8601).isValid()) {
    return moment(value).format('lll');
  } else {
    return values["value"];
  }
}

function AssetTable({ params }) {
  const { data: session } = useSession();
  const [survey, setSurvey] = useState([]);
  const [keys, setKeys] = useState([]);
  const [choices, setChoices] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterData, setFilderData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: pageSize,
  });
  const [isLoading, setIsLoading] = useState(false);

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
        width: 170,
        valueFormatter: columnFormat,
      }));
      setColumns(col_head);
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function getData() {
    const requestBody = JSON.stringify({
      filterData,
    });
    try {
      setIsLoading(true);
      let url =
        api_url +
        "/assets/data/" +
        params.uid +
        "?page=" +
        paginationModel["page"] +
        "&pageSize=" +
        paginationModel["pageSize"];
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      });
      const data = await resp.json();
      setRows(data["data"]);
      setTotalRows(data["recordsTotal"]);
      setIsLoading(false);
    } catch (err) {
      console.log("Error", err);
      setIsLoading(false);
    }
  }
  const getCustomId = (row) => row["_id"];
  useEffect(() => {
    var arrResult = [];
    if (session) {
      getSurvey();
      getData();
    }
  }, [session]);

  useEffect(() => {
    getData();
  }, [paginationModel]);

  const handleSort = (values) => {
    console.log("Sort", values);
  };

  const handleFilter = (values) => {
    setFilderData(values);
    console.log("Filter", values);
  };

  return (
    <>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        sortingOrder={["desc", "asc"]}
        columns={columns}
        rows={rows}
        getRowId={getCustomId}
        rowCount={totalRows}
        pageSizeOptions={[10, 30, 50, 100]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        onSortModelChange={handleSort}
        rowHeight={25}        
        columnHeaderHeight={35}
        filterMode="server"
        onFilterModelChange={handleFilter}
        loading={isLoading}
        slots={{ toolbar: GridToolbar }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "#f0f0f0",
          },
        }}
      />
    </>
  );
}

export default AssetTable;
