import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

const columns = [
  { 
    field: 'submitter', 
    headerName: 'Submitter', 
    width: 200,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src="/api/placeholder/30/30" alt={params.value} />
        <span style={{ marginLeft: 8 }}>{params.value}</span>
      </div>
    ),
  },
  { field: 'ratedProduct', headerName: 'Rated product', width: 250,
    renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.value}</span>
        </div>
    ),
},
  { 
    field: 'score', 
    headerName: 'Score', 
    width: 170,
    fontSize:'10px',
    renderCell: (params) => (
      <Rating sx={{marginTop:2,fontSize:'20px'}} name="read-only" value={params.value} readOnly />
    ),
  },
  { 
    field: 'releaseDate', 
    headerName: 'Release date', 
    width: 200,
  },
  {
    field: 'reviews',
    headerName: 'Reviews',
    width: 300,
  },
];

const rows = [
  { id: 1, submitter: 'John David', ratedProduct: 'Plant A. (Name: Plant name A.)', score: 4, releaseDate: '2024-06-25', reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 2, submitter: 'John David', ratedProduct: 'Plant A. (Name: Plant name A.)', score: 4, releaseDate: '2024-06-25', reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 3, submitter: 'John David', ratedProduct: 'Plant A. (Name: Plant name A.)', score: 4, releaseDate: '2024-06-25', reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 4, submitter: 'John David', ratedProduct: 'Plant A. (Name: Plant name A.)', score: 4, releaseDate: '2024-06-25', reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 5, submitter: 'John David', ratedProduct: 'Plant A. (Name: Plant name A.)', score: 4, releaseDate: '2024-06-25', reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 6, submitter: 'John David', ratedProduct: 'Plant A. (Name: Plant name A.)', score: 4, releaseDate: '2024-06-25', reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 7, submitter: 'John David', ratedProduct: 'Plant A. (Name: Plant name A.)', score: 4, releaseDate: '2024-06-25', reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 8, submitter: 'John David', ratedProduct: 'Plant A. (Name: Plant name A.)', score: 4, releaseDate: '2024-06-25', reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
];

export default function ReviewsTable() {
  return (
    <Paper sx={{ height: 400, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        sx={{ border: 0,fontSize:'13.2px',color:"#404D61",
'& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#F5F5F5',
            color: '#B1B1B1',
            fontSize: '14px',
        
          },


         }}
      />
    </Paper>
  );
}