import { useState, useMemo, useEffect } from "react";
import {
  Button,
  TextField,
  DialogActions,
  Grid,
  Autocomplete,
} from "@mui/material";
import DialogBasic from "../../commons/DialogBasic/DialogBasic";
import "./PlantersEditDialog.scss";
import { aget, apost } from "@utils/util_axios";
import { showErrorToast, showSuccessToast } from "@utils/util_toastify";
import { aupdate } from "@utils/util_axios";

const plantFields = [
  { label: "Name", name: "name" },
  { label: "Sub Name", name: "sub_name" },
  { label: "Genus ID", name: "genus_id", type: "select" },
  { label: "Plant Type ID", name: "plant_type_id", type: "select" },
  { label: "Image URL", name: "img_url" },
  { label: "Video URL", name: "video_url" },
  { label: "Height", name: "height", type: "text" },
  { label: "Width", name: "width", type: "text" },
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

export default function PlantersEditDialog({
  item = null,
  onClose = () => {},
  onFinish = () => {},
  fields = plantFields
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [genusList, setGenusList] = useState(null);
  const [plantTypeList, setPlantTypeList] = useState(null);

  const initialFormData = useMemo(
    () => fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
    [fields]
  );

  const [formData, setFormData] = useState(initialFormData);

  // Update formData when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        sub_name: item.sub_name || "",
        genus_id: item.genus_id?._id || "",
        plant_type_id: item.plant_type_id?._id || "",
        img_url: item.img_url?.[0] || "",
        video_url: item.video_url?.[0] || "",
        height: item.height || "",
        width: item.width || "",
        zones: item.zones || "",
        uses: item.uses || "",
        tolerance: item.tolerance || "",
        bloom_time: item.bloom_time || "",
        light: item.light || "",
        moisture: item.moisture || "",
        maintenance: item.maintenance || "",
        growth_rate: item.growth_rate || "",
        plant_seasonal_interest: item.plant_seasonal_interest || "",
        describe: item.describe || "",
        noteworthy_characteristics: item.noteworthy_characteristics || "",
        care: item.care || "",
        propagation: item.propagation || "",
        problems: item.problems || "",
        water: item.water || "",
        humidity: item.humidity || "",
        fertilizer: item.fertilizer || "",
        size: item.size || "",
        price: item.price || "",
      });
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    return Object.values(formData).every((value) => value);
    return true;
  }, [formData]);

  const handleSubmit = () => {
    setIsProcessing(true);
    aupdate(`/plants/${item._id}`, formData)
      .then(() => {
        showSuccessToast("Planters edited successfully!");
        onFinish();
        onClose();
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 403) {
          showErrorToast("No permission to use this!");
        } else {
          showErrorToast("Error editing product.");
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    if (item != null) {
      aget("/genus")
        .then((res) => {
          setGenusList(res.data);
        })
        .catch((err) => {
          setGenusList([]);
          console.error(err);
        });

      aget("/plant-types")
        .then((res) => {
          setPlantTypeList(res.data);
        })
        .catch((err) => {
          setPlantTypeList([]);
        });
    }
  }, [item]);

  return (
    <DialogBasic
      className="planters-edit-dialog"
      title="Edit Item"
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
          {fields.map((field, index) => (
            <Grid item xs={12} sm={field.gridSize || 6} key={index}>
              {field.name === "genus_id" && genusList ? (
                <Autocomplete
                  defaultValue={
                    genusList.filter((p) => p._id == formData.genus_id)[0] || {}
                  }
                  options={genusList}
                  getOptionLabel={(option) => option?.name}
                  onChange={(e, value) =>
                    handleSelectChange("genus_id", value ? value.id : "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Genus" fullWidth />
                  )}
                />
              ) : field.name === "plant_type_id" && plantTypeList ? (
                <Autocomplete
                  defaultValue={
                    plantTypeList.filter(
                      (p) => p._id == formData.plant_type_id
                    )[0] || {}
                  }
                  options={plantTypeList}
                  getOptionLabel={(option) => option.plant_type_name}
                  onChange={(e, value) =>
                    handleSelectChange("plant_type_id", value ? value.id : "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Plant Type" fullWidth />
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
