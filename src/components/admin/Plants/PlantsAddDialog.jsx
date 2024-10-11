import { useState, useMemo, useEffect } from "react";
import { Button, TextField, DialogActions, Grid, Autocomplete } from "@mui/material";
import DialogBasic from "../commons/DialogBasic/DialogBasic";
import "./PlantsAddDialog.scss";
import { aget, apost } from "../../utils/util_axios";
import { showErrorToast, showSuccessToast } from "../../utils/util_toastify";

const plantFields = [
  { label: "Name", name: "name" },
  { label: "Sub Name", name: "sub_name" },
  { label: "Genus ID", name: "genus_id", type: "select" },
  { label: "Plant Type ID", name: "plant_type_id", type: "select" },
  { label: "Image URL", name: "img_url" },
  { label: "Video URL", name: "video_url" },
  { label: "Height", name: "height", type: "number" },
  { label: "Width", name: "width", type: "number" },
  { label: "Zones", name: "zones" },
  { label: "Uses", name: "uses" },
  { label: "Tolerance", name: "tolerance" },
  { label: "Bloom Time", name: "bloom_time" },
  { label: "Light", name: "light" },
  { label: "Moisture", name: "moisture" },
  { label: "Maintenance", name: "maintenance" },
  { label: "Growth Rate", name: "growth_rate" },
  { label: "Seasonal Interest", name: "plant_seasonal_interest" },
  { label: "Description", name: "describe" },
  { label: "Noteworthy Characteristics", name: "noteworthy_characteristics" },
  { label: "Care", name: "care" },
  { label: "Propagation", name: "propagation" },
  { label: "Problems", name: "problems" },
  { label: "Water", name: "water" },
  { label: "Humidity", name: "humidity" },
  { label: "Fertilizer", name: "fertilizer" },
  { label: "Size", name: "size" },
  { label: "Price", name: "price", type: "number" },
];

export default function PlantsAddDialog({
  open,
  onClose,
  fields = plantFields,
  apiEndpoint = "/plants",
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [genusList, setGenusList] = useState([]);
  const [plantTypeList, setPlantTypeList] = useState([]);

  const initialFormData = useMemo(
    () => fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
    [fields]
  );

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    return Object.values(formData).every((value) => value && value.trim() !== "");
  }, [formData]);

  const handleSubmit = () => {
    setIsProcessing(true);
    apost(apiEndpoint, formData)
      .then(() => {
        showSuccessToast("Plants added successfully!");
        onClose();
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 403) {
          showErrorToast("No permission to use this!");
        } else {
          showErrorToast("Error adding product.");
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    if (open) {
      aget("/genus")
        .then((res) => {
          setGenusList(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
      aget("/plant-types").then((res) => {
        setPlantTypeList(res.data);
      });
    }
  }, [open]);

  return (
    <DialogBasic
      className="plants-add-dialog"
      title="Add New Item"
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
            <Grid item xs={12} sm={field.gridSize || 6} key={index}>
              {field.name === "genus_id" ? (
                <Autocomplete
                  options={genusList}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) =>
                    handleSelectChange("genus_id", value ? value.id : "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Genus"
                      fullWidth
                    />
                  )}
                />
              ) : field.name === "plant_type_id" ? (
                <Autocomplete
                  options={plantTypeList}
                  getOptionLabel={(option) => option.plant_type_name}
                  onChange={(e, value) =>
                    handleSelectChange("plant_type_id", value ? value.id : "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Plant Type"
                      fullWidth
                    />
                  )}
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
