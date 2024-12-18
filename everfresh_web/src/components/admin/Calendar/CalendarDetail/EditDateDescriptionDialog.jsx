import React, { useRef, useState } from "react";
import {
  Button,
} from "@mui/material";
import "./EditDateDescriptionDialog.scss";
import DialogBasic from "../../commons/DialogBasic/DialogBasic";
import TextEditor from "../../commons/TextEditor/TextEditor";

export default function EditDateDescriptionDialog({
  open,
  onClose,
  initialDescription,
  onSave,
}) {
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(description);
    onClose();
  };

  return (
    <DialogBasic
      open={open}
      title={"Edit day description"}
      onClose={onClose}
      className="calendar-edit-date-dialog"
      footer={(
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </>
      )}
    >
      <p className="title">Edit description</p>
      <TextEditor />
    </DialogBasic>
  );
}
