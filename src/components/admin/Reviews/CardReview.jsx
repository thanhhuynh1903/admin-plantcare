import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import TreeSample from "../../../assets/pages/Dashboard/TreeSample.png";

export default function CardReview() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        paddingX: 2,
        paddingTop: 1,
        width: "40%",
        borderRadius: 3,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 120, height: 132 }}
        image={TreeSample}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" sx={{fontWeight:600,fontSize:'20px'}}>
            Tree A
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{fontSize:'22px',fontWeight:500,color:'#009E71' }}
          >
            $98.00
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            Plant name: Iris
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {">>"} View product on page
        </Box>
      </Box>
    </Card>
  );
}
