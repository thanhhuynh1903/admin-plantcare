import React, { useState, useEffect } from "react";
import moment from "moment";
import { aget, apost, aupdate, adelete } from "@utils/util_axios";
import "./VariantsPlantTypePage.scss";
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

export default function VariantsPlantTypePage() {

  const [isLoaded, setIsLoaded] = useState(false);

  const [plantTypes, setPlantTypes] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPlantType, setSelectedPlantType] = useState(null);
  const [newPlantTypeName, setNewPlantTypeName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPageHeadTitle("Plant Type - Variants");
    fetchPlantTypes();
  }, []);

  const fetchPlantTypes = async () => {
    setIsLoaded(true);
    try {
      const result = await aget('/plant-types');
      setPlantTypes(result.data);
    }
    catch (error) {
      console.error('Error fetching plant types:', error);
      throw error;
    }
    finally {
      setIsLoaded(false);
    }
  };

  const handleEdit = (plantType) => {
    setSelectedPlantType(plantType);
    setNewPlantTypeName(plantType.plant_type_name);
    setEditDialogOpen(true);
  };

  const handleDelete = (plantType) => {
    setSelectedPlantType(plantType);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await aupdate(`/plant-types/${selectedPlantType._id}`, { plant_type_name: newPlantTypeName });
      showSuccessToast("Plant type updated successfully!");
      fetchPlantTypes();
    } catch (error) {
      showErrorToast("Failed to update plant type.");
    } finally {
      setEditDialogOpen(false);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await adelete(`/plant-types/${selectedPlantType._id}`);
      showSuccessToast("Plant type deleted successfully!");
      fetchPlantTypes();
    } catch (error) {
      showErrorToast("Failed to delete plant type.");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleAddSubmit = async () => {
    try {
      await apost('/plant-types', { plant_type_name: newPlantTypeName });
      showSuccessToast("Plant type added successfully!");
      fetchPlantTypes();
    } catch (error) {
      showErrorToast("Failed to add plant type.");
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

  const filteredPlantTypes = plantTypes.filter(plantType =>
    plantType == null || plantType.plant_type_name == null || plantType.plant_type_name.toLowerCase().includes(searchQuery)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="page-variants-plant-type">
      <div className="main-label">
        <Button component={Link} to="/variants">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <CategoryOutlinedIcon />
        <p>Variants - Plant Type</p>
      </div>

      <div className="content">
        {
          (isLoaded) ? (
            <div className="loading">
              <LoadingIcon />
            </div>
          ) : (
            <>
              <div className="actions-row">
                <Button className='btn-add' variant="contained" color="primary" onClick={() => setAddDialogOpen(true)}>
                  + Add Plant Type
                </Button>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search Plant Types"
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
                  {filteredPlantTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((plantType) => (
                    <TableRow key={plantType._id}>
                      <TableCell>{plantType._id}</TableCell>
                      <TableCell>{plantType.plant_type_name}</TableCell>
                      <TableCell>{moment(plantType.createdAt).format('MMMM Do YYYY')}</TableCell>
                      <TableCell>{moment(plantType.updatedAt).format('MMMM Do YYYY')}</TableCell>
                      <TableCell>
                        <IconButton className="btn-edit" onClick={() => handleEdit(plantType)}><EditIcon /></IconButton>
                        <IconButton className="btn-delete" onClick={() => handleDelete(plantType)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredPlantTypes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )
        }

      </div>

      {/* Edit Dialog */}
      <DialogBasic
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="xs"
        title="Edit Plant Type"
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
          label="Plant Type Name"
          value={newPlantTypeName}
          onChange={(e) => setNewPlantTypeName(e.target.value)}
          fullWidth
        />
      </DialogBasic>

      {/* Delete Dialog */}
      <DialogBasic
        open={deleteDialogOpen}
        maxWidth="xs"
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Plant Type"
        footer={
          <>
            <Button onClick={handleDeleteSubmit} variant="contained" color="error">Delete</Button>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          </>
        }
      >
        <p>Are you sure you want to delete {selectedPlantType?.plant_type_name}?</p>
      </DialogBasic>

      {/* Add Dialog */}
      <DialogBasic
        open={addDialogOpen}
        maxWidth="xs"
        onClose={() => setAddDialogOpen(false)}
        title="Add Plant Type"
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
          label="Plant Type Name"
          value={newPlantTypeName}
          onChange={(e) => setNewPlantTypeName(e.target.value)}
          fullWidth
        />
      </DialogBasic>
    </div>
  );
}
