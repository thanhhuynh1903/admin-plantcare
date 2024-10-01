import React from "react";
import { Button } from "@mui/material";
import "./DeleteEventDialog.scss";
import DialogBasic from "../../commons/DialogBasic/DialogBasic";

export default function DeleteEventDialog({
  open,
  onClose,
  onDelete,
  eventTitle,
}) {
  return (
    <DialogBasic
      title="Delete Event"
      maxWidth={"sm"}
      open={open}
      onClose={onClose}
      className="calendar-delete-event-dialog"
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onDelete} color="error">
            Delete
          </Button>
        </>
      }
    >
      <p>Are you sure you want to delete the event "{eventTitle}"?</p>
      <br />
      <p><b>You cannot undo this decision once it is deleted.</b></p>
    </DialogBasic>
  );
}
