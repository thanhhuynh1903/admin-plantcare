import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import Transition from './Transition';
import './AddEventDialog.scss';

const tags = ["Custom", "Important", "News", "Optional", "Event"];

export default function AddEventDialog({ open, onClose, onAdd }) {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    tag: 'Custom',
    startTime: '',
    endTime: '',
    location: ''
  });

  const handleAdd = () => {
    onAdd(event);
    onClose();
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose} className="calendar-add-event-dialog">
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Tag"
          value={event.tag}
          onChange={(e) => setEvent({ ...event, tag: e.target.value })}
          margin="normal"
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Start Time"
          type="datetime-local"
          value={event.startTime}
          onChange={(e) => setEvent({ ...event, startTime: e.target.value })}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="End Time"
          type="datetime-local"
          value={event.endTime}
          onChange={(e) => setEvent({ ...event, endTime: e.target.value })}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Location (Optional)"
          value={event.location}
          onChange={(e) => setEvent({ ...event, location: e.target.value })}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add Event</Button>
      </DialogActions>
    </Dialog>
  );
}
