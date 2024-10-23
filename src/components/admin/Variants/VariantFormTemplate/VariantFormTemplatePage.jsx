import React, { useState, useEffect } from "react";
import moment from "moment";
import { aget, apost, aupdate, adelete } from "@utils/util_axios";
import "./VariantFormTemplatePage.scss";
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

export default function VariantsFormTemplatePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newTemplateTitle, setNewTemplateTitle] = useState("");
  const [newTemplateBody, setNewTemplateBody] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPageHeadTitle("Form Template - Variants");
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setIsLoaded(true);
   
    const sampleData = [
      { _id: '1', title: 'Sample Template 1', body: 'This is a sample template body 1', createdAt: new Date(), updatedAt: new Date() },
      { _id: '2', title: 'Sample Template 2', body: 'This is a sample template body 2', createdAt: new Date(), updatedAt: new Date() },
      { _id: '3', title: 'Sample Template 3', body: 'This is a sample template body 3', createdAt: new Date(), updatedAt: new Date() },
    ];
    setTemplates(sampleData);
    setIsLoaded(false);
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setNewTemplateTitle(template.title);
    setNewTemplateBody(template.body);
    setEditDialogOpen(true);
  };

  const handleDelete = (template) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {

    try {
      const updatedTemplate = { ...selectedTemplate, title: newTemplateTitle, body: newTemplateBody };
      setTemplates(templates.map(t => (t._id === selectedTemplate._id ? updatedTemplate : t)));
      showSuccessToast("Template updated successfully!");
    } catch (error) {
      showErrorToast("Failed to update template.");
    } finally {
      setEditDialogOpen(false);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      setTemplates(templates.filter(t => t._id !== selectedTemplate._id));
      showSuccessToast("Template deleted successfully!");
    } catch (error) {
      showErrorToast("Failed to delete template.");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleAddSubmit = async () => {
    // Simulate API call for adding
    try {
      const newTemplate = { _id: Date.now().toString(), title: newTemplateTitle, body: newTemplateBody, createdAt: new Date(), updatedAt: new Date() };
      setTemplates([...templates, newTemplate]);
      showSuccessToast("Template added successfully!");
    } catch (error) {
      showErrorToast("Failed to add template.");
    } finally {
      setAddDialogOpen(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value?.toLowerCase());
  };

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery) || template.body.toLowerCase().includes(searchQuery)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="page-variants-form-template">
      <div className="main-label">
        <Button component={Link} to="/variants">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <CategoryOutlinedIcon />
        <p>Variants - Form Template</p>
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
                + Add Template
              </Button>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search Templates"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <Table className="shadow-table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '10%' }}>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Date Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTemplates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((template) => (
                  <TableRow key={template._id}>
                    <TableCell>{template._id}</TableCell>
                    <TableCell>{template.title}</TableCell>
                    <TableCell>{template.body}</TableCell>
                    <TableCell>{moment(template.createdAt).format('MMMM Do YYYY')}</TableCell>
                    <TableCell>{moment(template.updatedAt).format('MMMM Do YYYY')}</TableCell>
                    <TableCell>
                      <IconButton className="btn-edit" onClick={() => handleEdit(template)}><EditIcon /></IconButton>
                      <IconButton className="btn-delete" onClick={() => handleDelete(template)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredTemplates.length}
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
        title="Edit Template"
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
          label="Template Title"
          value={newTemplateTitle}
          onChange={(e) => setNewTemplateTitle(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          size="small"
          label="Template Body"
          value={newTemplateBody}
          onChange={(e) => setNewTemplateBody(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
      </DialogBasic>

      {/* Delete Dialog */}
      <DialogBasic
        open={deleteDialogOpen}
        maxWidth="xs"
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Template"
        footer={
          <>
            <Button onClick={handleDeleteSubmit} variant="contained" color="error">Delete</Button>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          </>
        }
      >
        <p>Are you sure you want to delete {selectedTemplate?.title}?</p>
      </DialogBasic>

      {/* Add Dialog */}
      <DialogBasic
        open={addDialogOpen}
        maxWidth="xs"
        onClose={() => setAddDialogOpen(false)}
        title="Add Template"
        footer={
          <>
            <Button className='btn-save' onClick={handleAddSubmit} variant="contained" color="primary">Add</Button>
            <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          </>
        }
      >
        <TextField
          variant="outlined"
          size="small"
          label="Template Title"
          value={newTemplateTitle}
          onChange={(e) => setNewTemplateTitle(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          size="small"
          label="Template Body"
          value={newTemplateBody}
          onChange={(e) => setNewTemplateBody(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
      </DialogBasic>
    </div>
  );
}
