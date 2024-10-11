import DialogBasic from "../../commons/DialogBasic/DialogBasic";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import "./PlantersDetailDeleteDialog.scss";
import { adelete } from "@utils/util_axios";
import { showSuccessToast } from "@utils/util_toastify";
import { useState } from "react";

export default function PlantersDetailDeleteDialog({ open, onClose, onFinish, item }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = () => {
    setIsProcessing(true);
    adelete(`/products/${item.id}`)
      .then((p) => {
        showSuccessToast("Product deleted successfully");
        onFinish();
      })
      .finally(() => {
        setIsProcessing(false);
        onClose();
      });
  };

  return (
    <DialogBasic
      className="planters-delete-dialog"
      title="Now deleting product"
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
        Are you sure you want to delete product: <b>{item?.name}</b>?<br />
        Please note that you cannot undo this action.
      </p>
    </DialogBasic>
  );
}
