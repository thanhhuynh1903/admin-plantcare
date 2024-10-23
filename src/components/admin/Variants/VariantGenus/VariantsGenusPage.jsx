import React, { useState, useEffect } from "react";
import moment from "moment";
import { aget, apost, aupdate, adelete } from "@utils/util_axios";
import "./VariantsGenusPage.scss";
import { setPageHeadTitle } from "../../../utils/util_web";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TablePagination, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogBasic from "@commons/DialogBasic/DialogBasic";
import { Link } from "react-router-dom";
import LoadingIcon from "../../commons/LoadingIcon/LoadingIcon";
import { showSuccessToast, showErrorToast } from "../../../utils/util_toastify";

export default function VariantsGenusPage() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [genusList, setGenusList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedGenus, setSelectedGenus] = useState(null);
  const [newGenusName, setNewGenusName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPageHeadTitle("Genus - Variants");
    fetchGenusList();
  }, []);

  const fetchGenusList = async () => {
    setIsLoaded(true);
    try {
      const result = await aget('/genus');
      setGenusList(result.data);
    } catch (error) {
      console.error('Error fetching genus:', error);
      throw error;
    } finally {
      setIsLoaded(false);
    }
  };

  const handleEdit = (genus) => {
    setSelectedGenus(genus);
    setNewGenusName(genus.name);
    setEditDialogOpen(true);
  };

  const handleDelete = (genus) => {
    setSelectedGenus(genus);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await aupdate(`/genus/${selectedGenus._id}`, { name: newGenusName });
      showSuccessToast("Genus updated successfully!");
      fetchGenusList();
    } catch (error) {
      showErrorToast("Failed to update genus.");
    } finally {
      setEditDialogOpen(false);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await adelete(`/genus/${selectedGenus._id}`);
      showSuccessToast("Genus deleted successfully!");
      fetchGenusList();
    } catch (error) {
      showErrorToast("Failed to delete genus.");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleAddSubmit = async () => {
    try {
      await apost('/genus', { name: newGenusName });
      showSuccessToast("Genus added successfully!");
      fetchGenusList();
    } catch (error) {
      showErrorToast("Failed to add genus.");
    } finally {
      setAddDialogOpen(false);
    }
  };

  const handleSearch = (e) => {
    if (!e.target.value) {
      setSearchQuery("");
    }
    setSearchQuery(e.target.value?.toLowerCase());
  };

  const filteredGenusList = genusList.filter(genus =>
    genus == null || genus.name == null || genus.name.toLowerCase().includes(searchQuery)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="page-variants-genus">
      <div className="main-label">
        <Button component={Link} to="/variants">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <CategoryOutlinedIcon />
        <p>Variants - Genus</p>
      </div>

      <div className="content">
        {isLoaded ? (
          <div className="loading">
            <LoadingIcon />
          </div>
        ) : (
          <>
            <div className="actions-row">
              <Button className='btn-add' variant="contained" color="primary" onClick={() => setAddDialogOpen(true)}>
                + Add Genus
              </Button>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search Genus"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <Table className="shadow-table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '10%' }}>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Date Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGenusList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((genus) => (
                  <TableRow key={genus._id}>
                    <TableCell>{genus._id}</TableCell>
                    <TableCell>{genus.name}</TableCell>
                    <TableCell>{moment(genus.createdAt).format('MMMM Do YYYY')}</TableCell>
                    <TableCell>{moment(genus.updatedAt).format('MMMM Do YYYY')}</TableCell>
                    <TableCell>
                      <IconButton className="btn-edit" onClick={() => handleEdit(genus)}><EditIcon /></IconButton>
                      <IconButton className="btn-delete" onClick={() => handleDelete(genus)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredGenusList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </div>

      {/* Edit Dialog */}
      <DialogBasic
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="xs"
        title="Edit Genus"
        footer={
          <>
            <Button className='btn-save' onClick={handleEditSubmit} variant="contained" color="primary">Save</Button>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          </>
        }
      >
        <TextField
          variant="outlined"
          size="small"
          label="Genus Name"
          value={newGenusName}
          onChange={(e) => setNewGenusName(e.target.value)}
          fullWidth
        />
      </DialogBasic>

      {/* Delete Dialog */}
      <DialogBasic
        open={deleteDialogOpen}
        maxWidth="xs"
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Genus"
        footer={
          <>
            <Button onClick={handleDeleteSubmit} variant="contained" color="error">Delete</Button>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          </>
        }
      >
        <p>Are you sure you want to delete {selectedGenus?.name}?</p>
      </DialogBasic>

      {/* Add Dialog */}
      <DialogBasic
        open={addDialogOpen}
        maxWidth="xs"
        onClose={() => setAddDialogOpen(false)}
        title="Add Genus"
        footer={
          <>
            <Button onClick={handleAddSubmit} variant="contained" color="primary">Add</Button>
            <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          </>
        }
      >
        <TextField
          variant="outlined"
          size="small"
          label="Genus Name"
          value={newGenusName}
          onChange={(e) => setNewGenusName(e.target.value)}
          fullWidth
        />
      </DialogBasic>
    </div>
  );
}
