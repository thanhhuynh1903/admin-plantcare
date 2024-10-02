import React from "react";
import { Grid, Container, Box, Pagination, Typography } from "@mui/material";
import ReviewCard from "./ReviewCard";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useEffect } from "react";
import { setPageHeadTitle } from "../../utils/util_web";
import ReviewsTable from "./ReviewsTable";

const reviews = [
  {
    id: 1,
    author: "John A.",
    avatar: "/path/to/avatar.jpg",
    date: "25/05/2023",
    product: "product N",
    plant_name: "Kindred",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 2,
    author: "John B.",
    avatar: "/path/to/avatar.jpg",
    date: "26/05/2023",
    product: "Product W",
    plant_name: "WHite black",
    rating: 4,
    text: "Lorem ipsum...",
  },
  {
    id: 3,
    author: "John C.",
    avatar: "/path/to/avatar.jpg",
    date: "27/05/2023",
    product: "Product M",
    plant_name: "King soft",
    rating: 3,
    text: "Lorem ipsum...",
  },
  {
    id: 4,
    author: "John D.",
    avatar: "/path/to/avatar.jpg",
    date: "28/05/2023",
    product: "product L",
    plant_name: "Error",
    rating: 2,
    text: "Lorem ipsum...",
  },
  {
    id: 5,
    author: "John E.",
    avatar: "/path/to/avatar.jpg",
    date: "29/05/2023",
    product: "Product k",
    plant_name: "Error",
    rating: 1,
    text: "Lorem ipsum...",
  },
  {
    id: 6,
    author: "John E.",
    avatar: "/path/to/avatar.jpg",
    date: "29/05/2023",
    product: "product C",
    plant_name: "hehehe",
    rating: 1,
    text: "Lorem ipsum...",
  },
  {
    id: 7,
    author: "John E.",
    avatar: "/path/to/avatar.jpg",
    date: "29/05/2023",
    product: "Product AC",
    plant_name: "Airdrop",
    rating: 1,
    text: "Lorem ipsum...",
  },
  {
    id: 8,
    author: "John E.",
    avatar: "/path/to/avatar.jpg",
    date: "29/05/2023",
    product: "product D",
    plant_name: "Hairdress",
    rating: 1,
    text: "Lorem ipsum...",
  },
  {
    id: 9,
    author: "John E.",
    avatar: "/path/to/avatar.jpg",
    date: "29/05/2023",
    product: "product B",
    plant_name: "Blue took",
    rating: 1,
    text: "Lorem ipsum...",
  },
  {
    id: 5,
    author: "John E.",
    avatar: "/path/to/avatar.jpg",
    date: "29/05/2023",
    product: "product A",
    plant_name: "Airpod",
    rating: 1,
    text: "Lorem ipsum...",
  },
 
];

const ReviewsGrid = () => {
  const [page, setPage] = React.useState(1);
  const reviewsPerPage = 8;
  const [viewMode, setViewMode] = React.useState('grid'); // State to manage view mode
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };
  console.log(viewMode);
  
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const startIndex = (page - 1) * reviewsPerPage + 1;
  const endIndex = Math.min(page * reviewsPerPage, reviews.length);

console.log(viewMode);

  
  useEffect(() => {
    setPageHeadTitle("Review");
    // setEmployees(initialEmployeeData);
  }, []);
  return (
    <Box sx={{ maxWidth: 1100, margin: 'auto' }} >
      <Typography variant="h4" component="h1" gutterBottom>
        Review - View all ratings
      </Typography>
      <Box display="flex" justifyContent="end" mb={2}>
        <Box
          sx={{
            backgroundColor: viewMode === 'filter' ? "#CFCFCF" : "#FFF",
            marginX: "5px",
            paddingTop: "2px",
            paddingX: "6px",
            border: "1px solid #E0E0E0",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => toggleViewMode('filter')}
        >
          <FilterAltOutlinedIcon />
        </Box>
        <Box
          sx={{
            backgroundColor: viewMode === 'grid' ? "#CFCFCF" : "#FFF",
            marginX: "5px",
            paddingTop: "2px",
            paddingX: "6px",
            border: "1px solid #E0E0E0",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => toggleViewMode('grid')}
        >
          <MenuOutlinedIcon />
        </Box>
        <Box
          sx={{
            backgroundColor: viewMode === 'table' ? "#CFCFCF" : "#FFF",
            marginX: "5px",
            paddingTop: "2px",
            paddingX: "6px",
            border: "1px solid #E0E0E0",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => toggleViewMode('table')}
        >
          <AppsOutlinedIcon />
        </Box>
      </Box>
      {viewMode === "grid" ?
        <div>
      <Grid container spacing={2}>
        {reviews
          .slice((page - 1) * reviewsPerPage, page * reviewsPerPage)
          .map((review) => (
            <Grid item xs={12} sm={6} md={3} key={review.id}>
              <ReviewCard review={review} />
            </Grid>
          ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body2">{`Rows per page: ${reviewsPerPage}`}</Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" mr={2}>{`${startIndex}-${endIndex} of ${reviews.length}`}</Typography>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Box>
      </Box>
      </div>
      : 
      viewMode === "table" ?
      <ReviewsTable/>
      :
      <div>
        filter
      </div>
      }
    </Box>
  );
};

export default ReviewsGrid;
