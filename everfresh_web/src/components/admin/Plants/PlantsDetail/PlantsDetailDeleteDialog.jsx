import DialogBasic from "../../commons/DialogBasic/DialogBasic";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import "./PlantsDetailDeleteDialog.scss";
import { adelete } from "@utils/util_axios";
import { showSuccessToast } from "@utils/util_toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlantsDetailDeleteDialog({ open, onClose, onFinish, item }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate

  const handleDelete = () => {
    setIsProcessing(true);
    adelete(`/plants/${item._id}`)
      .then((p) => {
        showSuccessToast("Plant deleted successfully");
        navigate("/plants");
        onFinish();
      })
      .finally(() => {
        setIsProcessing(false);
        onClose();
      });
  };

  return (
    <DialogBasic
      className="plants-delete-dialog"
      title="Now deleting plant"
      open={item && open}
      onClose={onClose}
      maxWidth="sm"
      footer={
        <div className="dialog-footer">
          <Button
            className="btn-cancel"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="btn-delete"
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={isProcessing}
          >
            Delete
          </Button>
          {isProcessing && <LinearProgress />}
        </div>
      }
    >
      <p>
        Are you sure you want to delete plant: <b>{item?.name}</b>?<br />
        Please note that you cannot undo this action.
      </p>
    </DialogBasic>
  );
}
