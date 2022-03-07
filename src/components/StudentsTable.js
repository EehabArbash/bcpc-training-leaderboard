import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { HANDLES } from "../handlers";
import { getAccountsData } from "../api";
import { CircularProgress, Grid, Link } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "handle",
    headerName: "Handle",
    width: 150,
    sortable: true,
  },
  {
    field: "rank",
    headerName: "Rank",
    width: 150,
    sortable: true,
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    width: 110,
    sortable: true,
  },
  {
    field: "registrationTimeSeconds",
    headerName: "Created At",
    width: 110,
    sortable: true,
    valueGetter: (params) =>
      `${new Date(
        params.row.registrationTimeSeconds * 1000
      ).toLocaleDateString()}`,
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

  if (loading)
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Handle</TableCell>
            <TableCell align="center">Rank</TableCell>
            <TableCell align="center">Rating</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Submissions</TableCell>
            <TableCell align="center">Accepted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" scope="row">
                <Link
                  target="_blank"
                  href={`https://codeforces.com/profile/${account.handle}`}
                >
                  {account.handle}
                </Link>
              </TableCell>
              <TableCell align="center" scope="row">
                {account.rating ?? 0}
              </TableCell>
              <TableCell align="center" scope="row">
                {account.rank ?? "--------"}
              </TableCell>
              <TableCell align="center" scope="row">
                {new Date(
                  account.registrationTimeSeconds * 1000
                ).toLocaleDateString()}
              </TableCell>
              <TableCell align="center" scope="row">
                {account.submissionCount}
              </TableCell>
              <TableCell align="center" scope="row">
                {account.okCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
