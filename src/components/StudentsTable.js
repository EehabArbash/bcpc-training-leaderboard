import React, { useState, useEffect } from "react";
import { HANDLES } from "../handlers";
import { getAccountsData } from "../api";
import { Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "handle",
    headerName: "Handle",
    sortable: true,
    width: 200,

    renderCell: (params) => {
      return (
        <Link
          target="_blank"
          href={`https://codeforces.com/profile/${params.row.handle}`}
        >
          {params.row.handle}
        </Link>
      );
    },
    headerAlign: 'center',
    align : 'center',

  },
  {
    field: "rank",
    headerName: "Rank",
    sortable: true,
    width: 200,
    headerAlign: 'center',
    align : 'center',

  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    sortable: true,
    width: 200,
    headerAlign: 'center',
    align : 'center',
  },
  {
    field: "registrationTimeSeconds",
    headerName: "Created At",
    sortable: true,
    width: 200,
    headerAlign: 'center',
    align : 'center',
    valueGetter: (params) =>
      `${new Date(
        params.row.registrationTimeSeconds * 1000
      ).toLocaleDateString()}`,
  },
  {
    field: "submissionCount",
    headerName: "Submission",
    sortable: true,
    width: 200,
    headerAlign: 'center',
    align : 'center',
  },
  {
    field: "okCount",
    headerName: "Accepted",
    sortable: true,
    width: 200,
    headerAlign: 'center',
    align : 'center',
  },
];

export default function StudentsTable() {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setLoading(true);

    getAccountsData(HANDLES).then((data) => {
      setAccounts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ height: 635, width: "100%" }}>
      <DataGrid
        rows={accounts}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        loading={loading}
      />
    </div>
  );
}
