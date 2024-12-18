import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const columns = [
  {
    field: "submitter",
    headerName: "Submitter",
    width: 200,
    renderCell: (params) => (
      <Link to={`/reviews/detail`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src="/api/placeholder/30/30" alt={params.value} />
          <span style={{ marginLeft: 8 }}>{params.value}</span>
        </div>
      </Link>
    ),
  },
  {
    field: "ratedProduct",
    headerName: "Rated product",
    width: 250,
    renderCell: (params) => (
      <Link to={`/reviews/detail`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{params.value}</span>
        </div>
      </Link>
    ),
  },
  {
    field: "score",
    headerName: "Score",
    width: 170,
    fontSize: "10px",
    renderCell: (params) => (
      <Link to={`/reviews/detail`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Rating
          sx={{ marginTop: 2, fontSize: "20px" }}
          name="read-only"
          value={'5'}
          readOnly
        />
      </Link>
    ),
  },
  {
    field: "releaseDate",
    headerName: "Release date",
    width: 200,
    renderCell: (params) => (
      <Link to={`/reviews/detail/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span>{params.value}</span>
      </Link>
    ),
  },
  {
    field: "reviews",
    headerName: "Reviews",
    width: 300,
    renderCell: (params) => (
      <Link to={`/reviews/detail/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span>{params.value}</span>
      </Link>
    ),
  },
];

const rows = [
  {
    id: 1,
    submitter: "John David",
    ratedProduct: "Plant A. (Name: Plant name A.)",
    score: 4,
    releaseDate: "2024-06-25",
    reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 2,
    submitter: "John David",
    ratedProduct: "Plant A. (Name: Plant name A.)",
    score: 4,
    releaseDate: "2024-06-25",
    reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 3,
    submitter: "John David",
    ratedProduct: "Plant A. (Name: Plant name A.)",
    score: 4,
    releaseDate: "2024-06-25",
    reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 4,
    submitter: "John David",
    ratedProduct: "Plant A. (Name: Plant name A.)",
    score: 4,
    releaseDate: "2024-06-25",
    reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 5,
    submitter: "John David",
    ratedProduct: "Plant A. (Name: Plant name A.)",
    score: 4,
    releaseDate: "2024-06-25",
    reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 6,
    submitter: "John David",
    ratedProduct: "Plant A. (Name: Plant name A.)",
    score: 4,
    releaseDate: "2024-06-25",
    reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 7,
    submitter: "John David",
    ratedProduct: "Plant A. (Name: Plant name A.)",
    score: 4,
    releaseDate: "2024-06-25",
    reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 8,
    submitter: "John David",
    ratedProduct: "Plant A. (Name: Plant name A.)",
    score: 4,
    releaseDate: "2024-06-25",
    reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
];

export default function ReviewsTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        sx={{
          border: 0,
          fontSize: "13.2px",
          color: "#404D61",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F5F5F5",
            color: "#B1B1B1",
            fontSize: "14px",
          },
        }}
      />
    </Paper>
  );
}
