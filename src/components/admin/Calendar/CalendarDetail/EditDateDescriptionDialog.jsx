import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Transition from './Transition';
import './EditDateDescriptionDialog.scss';

export default function EditDateDescriptionDialog({ open, onClose, initialDescription, onSave }) {
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(description);
    onClose();
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose} className="calendar-edit-date-dialog">
      <DialogTitle>Edit Date Description</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
