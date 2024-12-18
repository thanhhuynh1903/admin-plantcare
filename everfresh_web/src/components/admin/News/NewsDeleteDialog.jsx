import "./NewsDeleteDialog.scss";
import DialogBasic from "../commons/DialogBasic/DialogBasic";
import { Button } from "@mui/material";

export default function NewsDeleteDialog({
  open = false,
  onClose = () => {},
  onDelete = () => {},
  article = null,
}) {
  const deleteNews = () => {
    onDelete();
    onClose();
  };

  return (
    <DialogBasic
      title="Now deleting an article"
      maxWidth={"sm"}
      open={open}
      onClose={onClose}
      className="news-delete-dialog"
      footer={
        article ? (
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button className="btn-delete" onClick={deleteNews} color="error">
              Delete
            </Button>
          </>
        ) : (
          <Button onClick={onClose}>Close</Button>
        )
      }
    >
      {article ? (
        <>
          <p>Are you sure you want to delete the news?</p>
          <br />
          <p>
            <span style={{ fontWeight: 600 }}>
              You cannot undo this decision once it is deleted.
            </span>
          </p>
        </>
      ) : (
        <p>No news to delete.</p>
      )}
    </DialogBasic>
  );
}
