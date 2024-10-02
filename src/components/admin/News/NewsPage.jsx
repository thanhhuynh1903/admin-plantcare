import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./NewsPage.scss";
import { setPageHeadTitle } from "../../utils/util_web";
import { Link } from "react-router-dom";
import DialogBasic from "../commons/DialogBasic/DialogBasic";
import NewsDeleteDialog from "./NewsDeleteDialog";

export default function NewsPage() {
  useEffect(() => {
    setPageHeadTitle("News");
  }, []);

  const newsData = [
    {
      id: 1,
      submitter: "John David",
      title: 'Grand opening - "everfresh"',
      status: "Released",
      date: "25/06/2024",
      tags: "Official",
    },
    {
      id: 2,
      submitter: "John David",
      title: "Special event",
      status: "Draft",
      date: "25/06/2024",
      tags: "Official",
    },
    {
      id: 3,
      submitter: "John David",
      title: "New plant released",
      status: "Released",
      date: "25/06/2024",
      tags: "Official",
    },
    {
      id: 4,
      submitter: "John David",
      title: "Quarterly earning report",
      status: "Draft",
      date: "25/06/2024",
      tags: "Official",
    },
  ];

  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleDeleteClick = (article) => {
    setSelectedArticle(article);
    setOpenDeleteDialog(true);
  };

  const closeDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div className="page-news">
      <div className="main-label">
        <p>News / Articles</p>
      </div>
      <div className="tool">
        <Button
          className="btn-news-create"
          variant="contained"
          color="success"
          component={Link}
          to="/news/create"
        >
          + Publish new page
        </Button>
      </div>
      <div className="content">
        <TableContainer component={Paper} className="news-table">
          <Table aria-label="news table">
            <TableHead>
              <TableRow>
                <TableCell>Submitter</TableCell>
                <TableCell>Article title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Release date</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell sx={{textAlign:'center !important'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((news, index) => (
                  <TableRow key={index}>
                    <TableCell>{news.submitter}</TableCell>
                    <TableCell>{news.title}</TableCell>
                    <TableCell
                      className={`status ${
                        news.status === "Released" ? "released" : ""
                      }`}
                    >
                      {news.status}
                    </TableCell>
                    <TableCell>{news.date}</TableCell>
                    <TableCell>{news.tags}</TableCell>
                    <TableCell className="icon-cell">
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        component={Link} to={`/news/edit/${news.id}`}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(news)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={newsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
            }
            labelRowsPerPage="View rows"
          />
        </TableContainer>
      </div>

      {/* Delete Dialog */}
      <NewsDeleteDialog open={openDeleteDialog} onClose={closeDialog} onDelete={closeDialog} article={selectedArticle} />
    </div>
  );
}
