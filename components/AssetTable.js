import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const api_url = process.env.server;
// const api_url = 'https://eobj0ddwkt1wat0.m.pipedream.net';

function columnFormat(values) {
  let value = values["value"];
  if (moment(value, moment.ISO_8601).isValid()) {
    return moment(value).format("lll");
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
  const [colHeader, setColHeader] = useState([]);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [sortField, setSortField] = useState({
    Field: "",
    Sort: "",
  });
  const [filterData, setFilterData] = useState({
    Filter: "",
    Value: "",
    SortField: "",
    SortDirection: "",
  });
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

      const col_head = data["Content"]["survey"].map((item) => {
        function choice_value(params) {
          try {
            var hasil = data["Content"]["choices"].filter(function (z) {
              if (('q'+ z.list_name == params.field)&&(z.name == params.value)) {                
                return z.label[0]
              }
            })
          return hasil[0].label[0];         
          } catch {
            return ''
          }           
        }
        if (item["type"] == "start" || item["type"] == "end") {
          // Format Date
          return {
            field: item["name"],
            headerName: item["label"][0],
            width: 170,
            valueGetter: ({ value }) => value && moment(value).format("lll"),
          };
        } else if (item["type"] == "select_one") {
          // Dropdown filter
          let value_list = data["Content"]["choices"].filter(function (data) {
            if ("q" + data.list_name == item["name"]) {
              return {
                value: data.name,
                label: data.label[0],
              };
            }
          });
          //   {
          //     "$autovalue": "65",
          //     "$kuid": "v8Ow6Gt4N",
          //     "label": [
          //         "MEKARWANGI"
          //     ],
          //     "list_name": "des",
          //     "myfilter": "6",
          //     "name": "65"
          // }
          return {
            field: item["name"],
            headerName: item["label"][0],
            width: 170,
            type: "singleSelect",
            valueOptions: value_list.sort(),
            valueFormatter: (params) => {
              return choice_value(params);
            },
            // let label = value_list.filter((z) => {
            //   if (('q' + z.list_name == item["name"]) && (params.value == z.name)) {
            //     return 'BENAR'
            //   } else {
            //     return 'zz'
            //   }
            //   // return z.list
            //   // return 'q' + z.name === item["name"] && z.params.value
            // })
          };
        } else {
          return {
            field: item["name"],
            headerName: item["label"][0],
            width: 170,
          };
        }
      });
      setColumns(col_head);
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function getData() {
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });

      const data = await resp.json();
      if (data["data"] != null) {
        setRows(data["data"]);
      } else {
        setRows([]);
      }
      setTotalRows(data["recordsTotal"]);
      setIsLoading(false);
    } catch (err) {
      console.log("Error", err);
      setIsLoading(false);
    }
  }
  const getCustomId = (row) => row["_id"];
  useEffect(() => {
    if (session) {
      getSurvey();
      getData();
    }
  }, [paginationModel, filterData, session]);

  const handleSort = (values) => {
    if (session) {
      setFilterData((prevState) => ({
        ...prevState,
        SortField: values[0]["field"],
        SortDirection: values[0]["sort"],
      }));
    }
  };

  const handleFilter = (values) => {
    if (session) {
      setFilterData((prevState) => ({
        ...prevState,
        Filter: values["items"][0]["field"],
        Value: values["items"][0]["value"],
      }));
    }
  };

  return (
    <>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: { pageSize: 30, page: 0 },
          },
        }}
        sortingOrder={["desc", "asc"]}
        columns={columns}
        rows={rows}
        getRowId={getCustomId}
        rowCount={totalRows}
        pageSizeOptions={[30, 50, 100]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        sortingMode="server"
        onSortModelChange={handleSort}
        rowHeight={25}
        columnHeaderHeight={35}
        filterMode="server"
        onFilterModelChange={handleFilter}
        filterDebounceMs={300}
        loading={isLoading}
        slots={{ toolbar: GridToolbar }}
        columnVisibilityModel={{
          judul: false,
        }}
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
