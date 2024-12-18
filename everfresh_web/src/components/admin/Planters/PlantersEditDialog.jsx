import { useState, useMemo, useEffect } from "react";
import {
  Button,
  TextField,
  DialogActions,
  Grid,
  Input,
  Box,
} from "@mui/material";
import DialogBasic from "../commons/DialogBasic/DialogBasic";
import "./PlantersEditDialog.scss";
import { showErrorToast, showSuccessToast } from "@utils/util_toastify";
import { uploadFileAndReturnUrl } from "@supabase_client";
import { uuidv4 } from "@utils/util_string";
import { aupdate } from "@utils/util_axios";

const planterFields = [
  { label: "Name", name: "name", section: "Basic Details" },
  { label: "Category", name: "category", section: "Basic Details" },
  { label: "Image", name: "img_object", section: "Image" },
  { label: "Price", name: "price", type: "number", section: "Pricing" },
  { label: "Size", name: "size", section: "Dimensions" },
  { label: "Material", name: "material", section: "Additional Details" },
  {
    label: "Special Feature",
    name: "special_feature",
    section: "Additional Details",
  },
  { label: "Style", name: "style", section: "Additional Details" },
  {
    label: "Planter Form",
    name: "planter_form",
    section: "Additional Details",
  },
  { label: "About", name: "about", section: "Description" },
  {
    label: "Default Color",
    name: "default_color",
    section: "Additional Details",
  },
  { label: "Theme", name: "theme", section: "Additional Details" },
  { label: "Finish Type", name: "finish_type", section: "Additional Details" },
  { label: "Item Weight", name: "item_weight", section: "Dimensions" },
  {
    label: "Manufacturer",
    name: "manufacturer",
    section: "Manufacturer Details",
  },
  { label: "ASIN", name: "asin", section: "Manufacturer Details" },
  {
    label: "Item Model Number",
    name: "item_model_number",
    section: "Manufacturer Details",
  },
  {
    label: "Best Seller Rank",
    name: "best_seller_rank",
    section: "Additional Details",
  },
  {
    label: "Date First Available",
    name: "date_first_available",
    section: "Additional Details",
  },
  { label: "Status", name: "status", section: "Status" },
  { label: "Description", name: "describe", section: "Description" },
];

export default function PlantersEditDialog({
  item = null,
  onClose = () => {},
  onFinish = () => {},
  fields = planterFields,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [originalImageUrl, setOriginalImageUrl] = useState("");

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
        img_object: item.img_object || [],
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
      // Set the original image URL
      setOriginalImageUrl(item.img_object?.[0]?.img_url || "");
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img_object") {
      setImageFiles(files);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFiles([file]);
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.category.trim() !== "" &&
      (imageFiles.length > 0 || originalImageUrl !== "") &&
      formData.price > 0
    );
  }, [formData, imageFiles, originalImageUrl]);

  const handleSubmit = () => {
    setIsProcessing(true);

    const imageFile = imageFiles[0];

    // If no new image is uploaded, skip the upload step
    if (imageFile) {
      uploadFileAndReturnUrl(`/public/planters/${uuidv4()}.jpg`, imageFile)
        .then((url) => {
          let finalForm = {
            ...formData,
            img_object: {
              img_url: url,
              color: "white",
            },
          };
          setFormData(finalForm);

          aupdate(`/planters/${item._id}`, finalForm)
            .then(() => {
              showSuccessToast("Planter updated successfully!");
              onFinish();
              onClose();
            })
            .catch((err) => {
              const status = err?.response?.status;
              if (status === 403) {
                showErrorToast("No permission to use this!");
              } else {
                console.log(err);
                showErrorToast("Error updating planter.");
              }
            })
            .finally(() => {
              setIsProcessing(false);
            });
        })
        .catch(() => {
          showErrorToast("Error uploading image.");
          setIsProcessing(false);
        });
    } else {
      // Skip image upload if not changed
      let finalForm = { ...formData, img_object: item.img_object };

      aupdate(`/planters/${item._id}`, finalForm)
        .then(() => {
          showSuccessToast("Planter updated successfully!");
          onFinish();
          onClose();
        })
        .catch((err) => {
          const status = err?.response?.status;
          if (status === 403) {
            showErrorToast("No permission to use this!");
          } else {
            console.log(err);
            showErrorToast("Error updating planter.");
          }
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  };

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
            disabled={isProcessing || !isFormValid}
          >
            Save
          </Button>
        </DialogActions>
      }
    >
      <div className="item-dialog">
        <Grid container spacing={2}>
          {Object.keys(groupedFields).map((sectionTitle, sectionIndex) => (
            <Grid item xs={12} key={sectionIndex}>
              <div className="section-title">{sectionTitle}</div>
              <Grid container spacing={2}>
                {groupedFields[sectionTitle].map((field, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    {field.name === "img_object" ? (
                      <Box>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          fullWidth
                        />
                        {item && item.img_object && (
                          <img
                            className="item-existing-image"
                            src={formData.img_object[0]?.img_url}
                            alt="Uploaded"
                            width="100%"
                          />
                        )}
                      </Box>
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
