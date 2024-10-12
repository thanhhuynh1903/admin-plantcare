import { useState, useMemo } from "react";
import { Button, TextField, DialogActions, Grid, Input, Typography } from "@mui/material";
import DialogBasic from "../commons/DialogBasic/DialogBasic";
import "./PlantersAddDialog.scss";
import { apost } from "@utils/util_axios";
import { showErrorToast, showSuccessToast } from "@utils/util_toastify";
import { uploadFileAndReturnUrl } from "@supabase_client";
import { uuidv4 } from "../../utils/util_string";

// Grouping fields by categories
const planterFields = [
  { label: "Name", name: "name", section: "Basic Details" },
  { label: "Category", name: "category", section: "Basic Details" },
  { label: "Image", name: "img_object", section: "Image" },
  { label: "Price", name: "price", type: "number", section: "Pricing" },
  { label: "Size", name: "size", section: "Dimensions" },
  { label: "Material", name: "material", section: "Additional Details" },
  { label: "Special Feature", name: "special_feature", section: "Additional Details" },
  { label: "Style", name: "style", section: "Additional Details" },
  { label: "Planter Form", name: "planter_form", section: "Additional Details" },
  { label: "About", name: "about", section: "Description" },
  { label: "Default Color", name: "default_color", section: "Additional Details" },
  { label: "Theme", name: "theme", section: "Additional Details" },
  { label: "Finish Type", name: "finish_type", section: "Additional Details" },
  { label: "Item Weight", name: "item_weight", section: "Dimensions" },
  { label: "Manufacturer", name: "manufacturer", section: "Manufacturer Details" },
  { label: "ASIN", name: "asin", section: "Manufacturer Details" },
  { label: "Item Model Number", name: "item_model_number", section: "Manufacturer Details" },
  { label: "Best Seller Rank", name: "best_seller_rank", section: "Additional Details" },
  { label: "Date First Available", name: "date_first_available", section: "Additional Details" },
  { label: "Status", name: "status", section: "Status" },
  { label: "Description", name: "describe", section: "Description" },
];

export default function PlantersAddDialog({ open, onClose, fields = planterFields }) {
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

    uploadFileAndReturnUrl(`/public/planters/${uuidv4()}.jpg`, imageFile).then((url) => {
      let finalForm = {
        ...formData,
        img_object: {
          img_url: url,
          color: "white",
        },
      };
      setFormData(finalForm);
      apost("/planters", finalForm)
        .then(() => {
          showSuccessToast("Planter added successfully!");
          onClose();
        })
        .catch((err) => {
          const status = err?.response?.status;
          if (status === 403) {
            showErrorToast("No permission to use this!");
          } else {
            console.log(err);
            showErrorToast("Error adding planter.");
          }
        })
        .finally(() => {
          setIsProcessing(false);
        });
    });
  };

  // Group fields by section
  const groupedFields = fields.reduce((acc, field) => {
    const { section } = field;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(field);
    return acc;
  }, {});

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
          {/* Dynamically render sections based on field grouping */}
          {Object.keys(groupedFields).map((sectionTitle, sectionIndex) => (
            <Grid item xs={12} key={sectionIndex}>
              <div className="section-title">{sectionTitle}</div>
              <Grid container spacing={2}>
                {groupedFields[sectionTitle].map((field, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    {field.name === "img_object" ? (
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
            </Grid>
          ))}
        </Grid>
      </div>
    </DialogBasic>
  );
}
