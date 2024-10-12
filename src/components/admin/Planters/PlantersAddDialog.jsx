import { useState, useMemo } from "react";
import { Button, TextField, DialogActions, Grid, Input } from "@mui/material";
import DialogBasic from "../commons/DialogBasic/DialogBasic";
import "./PlantersAddDialog.scss";
import { apost, apostfile } from "@utils/util_axios";
import { showErrorToast, showSuccessToast } from "@utils/util_toastify";

const planterFields = [
  { label: "Name", name: "name" },
  { label: "Category", name: "category" },
  { label: "Image", name: "img_url" },
  { label: "Price", name: "price", type: "number" },
  { label: "Size", name: "size" },
  { label: "Material", name: "material" },
  { label: "Special Feature", name: "special_feature" },
  { label: "Style", name: "style" },
  { label: "Planter Form", name: "planter_form" },
  { label: "About", name: "about" },
  { label: "Default Color", name: "default_color" },
  { label: "Theme", name: "theme" },
  { label: "Finish Type", name: "finish_type" },
  { label: "Item Weight", name: "item_weight" },
  { label: "Manufacturer", name: "manufacturer" },
  { label: "ASIN", name: "asin" },
  { label: "Item Model Number", name: "item_model_number" },
  { label: "Best Seller Rank", name: "best_seller_rank" },
  { label: "Date First Available", name: "date_first_available" },
  { label: "Status", name: "status" },
  { label: "Description", name: "describe" },
];

export default function PlantersAddDialog({
  open,
  onClose,
  fields = planterFields,
  apiEndpoint = "/planters",
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.category.trim() !== "" &&
      imageFile != null &&
      formData.price > 0
    );
  }, [formData, imageFile]);

  const handleSubmit = () => {
    setIsProcessing(true);

    console.log(formData)

    apostfile(apiEndpoint, imageFile, formData)
      .then(() => {
        showSuccessToast("Planter added successfully!");
        onClose();
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 403) {
          showErrorToast("No permission to use this!");
        } else {
          console.log(err)
          showErrorToast("Error adding planter.");
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <DialogBasic
      className="planters-add-dialog"
      title="Add New Planter"
      open={open}
      onClose={onClose}
      footer={
        <DialogActions>
          <Button
            onClick={onClose}
            color="secondary"
            className="btn-cancel"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            className="btn-save"
            disabled={isProcessing || !isFormValid}
          >
            Save
          </Button>
        </DialogActions>
      }
    >
      <div className="add-item-dialog">
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {field.name === "img_url" ? (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  fullWidth
                />
              ) : (
                <TextField
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  type={field.type || "text"}
                  fullWidth
                />
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    </DialogBasic>
  );
}
