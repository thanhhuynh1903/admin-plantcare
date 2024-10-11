import { useState, useMemo, useEffect } from "react";
import { Button, TextField, DialogActions, Grid } from "@mui/material";
import DialogBasic from "../commons/DialogBasic/DialogBasic";
import "./PlantersEditDialog.scss";
import { showErrorToast, showSuccessToast } from "@utils/util_toastify";
import { aupdate } from "@utils/util_axios";

const planterFields = [
  { label: "Name", name: "name" },
  { label: "Category", name: "category" },
  { label: "Image URL", name: "img_url" }, // From img_object
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

export default function PlantersEditDialog({
  item = null,
  onClose = () => {},
  onFinish = () => {},
  fields = planterFields
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const initialFormData = useMemo(
    () => fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
    [fields]
  );

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        category: item.category || "",
        img_url: item.img_object?.url || "", // Assuming img_object holds the URL
        price: item.price || "",
        size: item.size || "",
        material: item.material || "",
        special_feature: item.special_feature || "",
        style: item.style || "",
        planter_form: item.planter_form || "",
        about: item.about || "",
        default_color: item.default_color || "",
        theme: item.theme || "",
        finish_type: item.finish_type || "",
        item_weight: item.item_weight || "",
        manufacturer: item.manufacturer || "",
        asin: item.asin || "",
        item_model_number: item.item_model_number || "",
        best_seller_rank: item.best_seller_rank || "",
        date_first_available: item.date_first_available || "",
        status: item.status || "",
        describe: item.describe || "",
      });
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation logic: unlock save only when Name, Category, Image URL, and Price are filled
  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.img_url.trim() !== "" &&
      formData.price > 0
    );
  }, [formData]);

  const handleSubmit = () => {
    setIsProcessing(true);
    // Send full formData to API
    aupdate(`/planters/${item._id}`, formData)
      .then(() => {
        showSuccessToast("Planter edited successfully!");
        onFinish();
        onClose();
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 403) {
          showErrorToast("No permission to use this!");
        } else {
          showErrorToast("Error editing planter.");
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <DialogBasic
      className="planters-edit-dialog"
      title="Edit Planter"
      open={item != null}
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
            disabled={isProcessing || !isFormValid} // Disable until required fields are filled
          >
            Save
          </Button>
        </DialogActions>
      }
    >
      <div className="item-dialog">
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                type={field.type || "text"}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </DialogBasic>
  );
}
