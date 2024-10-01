import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import Transition from './Transition';
import './DeleteEventDialog.scss';

export default function DeleteEventDialog({ open, onClose, onDelete, eventTitle }) {
  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose} className="calendar-delete-event-dialog">
      <DialogTitle>Delete Event</DialogTitle>
      <DialogActions>
        <p>Are you sure you want to delete the event "{eventTitle}"?</p>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
